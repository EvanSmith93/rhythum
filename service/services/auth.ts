import { hash } from "bcrypt";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types";

const users: User[] = [];

export async function createUser(email: string, password: string) {
  const passwordHash = await hash(password, 10);

  const user: User = {
    email: email,
    password: passwordHash,
    sessionIds: [],
  };

  users.push(user);
  return user;
}

export async function getUser(field: keyof User, value: string) {
  return value ? users.find((user) => user[field] === value) : undefined;
}

export function setAuthCookie(res: Response, user: User) {
  user.token = uuidv4();

  res.cookie("token", user.token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

export function clearAuthCookie(res: Response, user: User) {
  delete user.token;
  res.clearCookie("token");
}
