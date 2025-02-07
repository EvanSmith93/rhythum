import { hash } from "bcrypt";
import express from "express";

const app = express();
app.use(express.json());

app.post("/api/auth", async (req, res) => {
  if (await getUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    res.send({ email: user.email });
  }
});

app.put("/api/auth", async (req, res) => {
  res.send({ email: "marta@id.com" });
});

app.delete("/api/auth", async (req, res) => {
  res.send({});
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

  const user = {
    email: email,
    password: passwordHash,
  };

  users.push(user);

  return user;
}

async function getUser(field: keyof User, value: string) {
  return users.find((user) => user[field] === value);
}

type User = {
  email: string;
  password: string;
};
