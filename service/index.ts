import { compare, hash } from "bcrypt";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(cookieParser());

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

app.get("/api/sessions", verifyAuth, async (req, res) => {
  const sessions = await getSessions(res.locals.user.email);
  res.send(sessions);
});

app.get("/api/sessions/id/:sessionId", verifyAuth, async (req, res) => {
  const session = await getSessionById(
    res.locals.user.email,
    req.params.sessionId
  );
  if (session) {
    res.send(session);
  } else {
    res.status(404).send({ msg: "Not Found" });
  }
});

app.post("/api/sessions", verifyAuth, async (req, res) => {
  const session = await startSession(res.locals.user);
  res.send(session);
});

app.put("/api/sessions/join/:code", verifyAuth, async (req, res) => {
  const session = await joinSession(res.locals.user, req.params.code);

  if (session) {
    res.send(session);
  } else {
    res.status(404).send({ msg: "Not Found" });
  }
});

app.put("/api/sessions/toggle/:sessionId", verifyAuth, async (req, res) => {
  try {
    const session = await toggleBreak(
      res.locals.user.email,
      req.params.sessionId
    );
    res.send(session);
  } catch (error) {
    res.status(400).send({ msg: (error as Error).message });
  }
});

app.put("/api/sessions/end/:sessionId", verifyAuth, async (req, res) => {
  try {
    await endSession(res.locals.user.email, req.params.sessionId);
    res.send({});
  } catch (error) {
    res.status(400).send({ msg: (error as Error).message });
  }
});

const errorQuote: Quote = {
  text: "Error, could not get quote",
  author: "Rhythum",
};

app.get("/api/quote", verifyAuth, async (req, res) => {
  const quoteRes = await fetch("https://zenquotes.io/api/random", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const content = await quoteRes.json();
  const quote = quoteRes.status === 200 ? convertToQuote(content) : errorQuote;

  res.send(quote);
});

app.post("/api/auth", async (req, res) => {
  if (await getUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user);
    res.send({ email: user.email });
  }
});

app.put("/api/auth", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user && (await compare(req.body.password, user.password))) {
    setAuthCookie(res, user);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.delete("/api/auth", verifyAuth, async (req, res) => {
  clearAuthCookie(res, res.locals.user);
  res.send({});
});

app.get("/api/user/me", verifyAuth, async (req, res) => {
  res.send({ email: res.locals.user.email });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

// DATA AND FUNCTIONS

const users: User[] = [];
const sessions: Session[] = [];

async function getSessions(userEmail: string) {
  return sessions.filter((session) => session.userEmails.includes(userEmail));
}

async function getSessionById(userEmail: string, sessionId: string) {
  const userSessions = await getSessions(userEmail);
  return userSessions.find((session) => session.id === sessionId) ?? null;
}

async function startSession(user: User) {
  const newSession: Session = {
    id: uuidv4(),
    code: generateCode(),
    activityChanges: [new Date()],
    hasEnded: false,
    userEmails: [user.email],
  };
  user.sessionIds.push(newSession.id);
  sessions.push(newSession);
  return newSession;
}

async function joinSession(user: User, code: string) {
  const session = sessions.find((session) => session.code === code);
  if (!session) return null;

  if (!session.userEmails.includes(user.email)) {
    user.sessionIds.push(session.id);
    session.userEmails.push(user.email);
  }
  return session;
}

async function toggleBreak(userEmail: string, sessionId: string) {
  const session = await getSessionById(userEmail, sessionId);
  if (!session) throw Error("Session does not exist");
  session.activityChanges.push(new Date());
  return session;
}

async function endSession(userEmail: string, sessionId: string) {
  const session = await getSessionById(userEmail, sessionId);
  if (!session) throw Error("Session does not exist");
  session.activityChanges.push(new Date());
  session.hasEnded = true;
}

async function createUser(email: string, password: string) {
  const passwordHash = await hash(password, 10);

  const user: User = {
    email: email,
    password: passwordHash,
    sessionIds: [],
  };

  users.push(user);
  return user;
}

async function getUser(field: keyof User, value: string) {
  return value ? users.find((user) => user[field] === value) : undefined;
}

function setAuthCookie(res: Response, user: User) {
  user.token = uuidv4();

  res.cookie("token", user.token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

function clearAuthCookie(res: Response, user: User) {
  delete user.token;
  res.clearCookie("token");
}

function generateCode() {
  const asciiMin = 65;
  const asciiMax = 91;

  const chars = [...Array(5).keys()].map(() => {
    const asciiChar =
      asciiMin + Math.floor(Math.random() * (asciiMax - asciiMin));
    return String.fromCharCode(asciiChar);
  });

  return chars.join("");
}

function convertToQuote(res: { q: string; a: string }[]): Quote {
  return { text: res[0].q, author: res[0].a };
}

type User = {
  email: string;
  password: string;
  token?: string;
  sessionIds: string[];
};

type Session = {
  id: string;
  code: string;
  activityChanges: Date[];
  hasEnded: boolean;
  userEmails: string[];
};

type Quote = {
  text: string;
  author: string;
};
