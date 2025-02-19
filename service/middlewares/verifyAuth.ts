import { NextFunction, Request, Response } from "express";
import { getUser } from "../services/auth";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};
