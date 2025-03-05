import { hash } from "bcrypt";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types";
import { db } from "../db/db";

export const userCollection = db.collection<User>("user");
userCollection.createIndex({ email: 1 }, { unique: true });

export async function createUser(email: string, password: string) {
  const passwordHash = await hash(password, 10);

  const data: User = {
    email,
    password: passwordHash,
    sessionIds: [],
  };

  const id = (await userCollection.insertOne(data)).insertedId;
  return (await userCollection.findOne({ _id: id }))!;
}

export async function getUser(field: keyof User, value: string) {
  if (!value) return;
  return userCollection.findOne({
    [field]: value,
  });
}

export async function setAuthCookie(res: Response, user: User) {
  const token = uuidv4();

  await userCollection.updateOne({ email: user.email }, { $set: { token } });

  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

export function clearAuthCookie(res: Response, user: User) {
  userCollection.updateOne({ email: user.email }, { $unset: { token: "" } });
  res.clearCookie("token");
}
