import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import {
  deleteSession,
  endSession,
  getSessionById,
  getSessions,
  joinSession,
  startSession,
  toggleBreak,
} from "../services/session";

export const router = Router();

router.get("/", verifyAuth, async (req, res) => {
  const sessions = await getSessions(res.locals.user.email);
  res.send(sessions);
});

router.get("/id/:sessionId", verifyAuth, async (req, res) => {
  const session = await getSessionById(req.params.sessionId);
  if (session) {
    res.send(session);
  } else {
    res.status(404).send({ msg: "Not Found" });
  }
});

router.post("/", verifyAuth, async (req, res) => {
  const session = await startSession(res.locals.user);
  res.send(session);
});

router.put("/join/:code", verifyAuth, async (req, res) => {
  const session = await joinSession(res.locals.user, req.params.code);

  if (session) {
    res.send(session);
  } else {
    res.status(404).send({ msg: "Not Found" });
  }
});

router.put("/toggle/:sessionId", verifyAuth, async (req, res) => {
  try {
    const session = await toggleBreak(req.params.sessionId);
    res.send(session);
  } catch (error) {
    res.status(400).send({ msg: (error as Error).message });
  }
});

router.put("/end/:sessionId", verifyAuth, async (req, res) => {
  try {
    await endSession(req.params.sessionId);
    res.send({});
  } catch (error) {
    res.status(400).send({ msg: (error as Error).message });
  }
});

router.delete("/:sessionId", verifyAuth, async (req, res) => {
  try {
    await deleteSession(req.params.sessionId);
    res.send({});
  } catch (error) {
    res.status(400).send({ msg: (error as Error).message });
  }
});
