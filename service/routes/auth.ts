import { Router } from "express";
import { compare } from "bcrypt";
import {
  clearAuthCookie,
  createUser,
  getUser,
  setAuthCookie,
} from "../services/auth";
import { verifyAuth } from "../middlewares/verifyAuth";

export const router = Router();

router.post("/", async (req, res) => {
  if (await getUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user);
    res.send({ email: user.email });
  }
});

router.put("/", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user && (await compare(req.body.password, user.password))) {
    setAuthCookie(res, user);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

router.delete("/", verifyAuth, async (req, res) => {
  clearAuthCookie(res, res.locals.user);
  res.send({});
});

router.get("/me", verifyAuth, async (req, res) => {
  res.send({ email: res.locals.user.email });
});
