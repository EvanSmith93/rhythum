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
  const sessions = await getSessions(res.locals.user.id);
  res.send(sessions);
});

app.get("/api/sessions/:sessionId", verifyAuth, async (req, res) => {
  const session = await getSessionById(
    res.locals.user.id,
    req.params.sessionId
  );
  res.send(session);
});

app.get("/api/sessions/:code", verifyAuth, async (req, res) => {
  const session = await getSessionByCode(res.locals.user.id, req.params.code);
  res.send(session);
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

// app.get("/api/user", async (req, res) => {
//   res.send({ email: "marta@id.com" });
// });

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

// DATA AND FUNCTIONS

const users: User[] = [];
const sessions: Session[] = [];

async function getSessions(userId: string) {
  return sessions.filter((session) => session.userIds.includes(userId));
}

async function getSessionById(userId: string, sessionId: string) {
  const userSessions = await getSessions(userId);
  return userSessions.find((session) => session.id === sessionId) ?? null;
}

async function getSessionByCode(userId: string, code: string) {
  const userSessions = await getSessions(userId);
  return userSessions.find((session) => session.code === code) ?? null;
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
  userIds: string[];
};
