import { compare, hash } from "bcrypt";
import cookieParser from "cookie-parser";
import express, { Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(cookieParser());

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
  console.log(user, users);
  if (user && (await compare(req.body.password, user.password))) {
    console.log("logging in user", req.body);
    setAuthCookie(res, user);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Incorrect Email or Password " });
  }
});

app.delete("/api/auth", async (req, res) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);

  if (user) {
    console.log("logging out user", req.body);
    clearAuthCookie(res, user);
  }

  res.send({});
});

app.get("/api/user/me", async (req, res) => {
  const token = req.cookies["token"];
  console.log(token);
  const user = await getUser("token", token);
  console.log(user);

  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.get("/api/user", async (req, res) => {
  res.send({ email: "marta@id.com" });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

const users: User[] = [];

async function createUser(email: string, password: string) {
  const passwordHash = await hash(password, 10);

  const user: User = {
    email: email,
    password: passwordHash,
  };
  console.log(user);

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
};
