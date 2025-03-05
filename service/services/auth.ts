import { hash } from "bcrypt";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types";
import { db } from "../db/db";

// const users: User[] = [];
const user = db.collection<User>("user");
user.createIndex({ email: 1 }, { unique: true });

export async function createUser(email: string, password: string) {
  const passwordHash = await hash(password, 10);

  const data: User = {
    email,
    password: passwordHash,
    sessionIds: [],
  };

  const id = (await user.insertOne(data)).insertedId;
  return (await user.findOne({ _id: id }))!;
}

export async function getUser(field: keyof User, value: string) {
  // return value ? users.find((user) => user[field] === value) : undefined;
  if (!value) return;
  return user.findOne({
    [field]: value,
  });
}

export async function setAuthCookie(res: Response, currUser: User) {
  const token = uuidv4();

  await user.updateOne({ email: currUser.email }, { $set: { token } });

  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

export function clearAuthCookie(res: Response, currUser: User) {
  // delete user.token;
  user.updateOne({ email: currUser.email }, { $unset: { token: "" } });
  res.clearCookie("token");
}
