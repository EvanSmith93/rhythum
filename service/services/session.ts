import { ObjectId } from "mongodb";
import { db } from "../db/db";
import { Session, User } from "../types";
import { userCollection } from "./auth";

const sessionCollection = db.collection<Omit<Session, "_id">>("session");

export async function getSessions(userEmail: string) {
  const res = sessionCollection.find({ userEmails: userEmail });
  return await res.toArray();
}

export async function getSessionById(sessionId: string) {
  return await sessionCollection.findOne({
    _id: new ObjectId(sessionId),
  });
}

export async function startSession(user: User) {
  const data: Omit<Session, "_id"> = {
    code: generateCode(),
    activityChanges: [new Date()],
    hasEnded: false,
    userEmails: [user.email],
  };

  const id = (await sessionCollection.insertOne(data)).insertedId.toString();
  userCollection.updateOne({ email: user.email }, { $push: { id } });

  return { id };
}

export async function joinSession(user: User, code: string) {
  const record = await sessionCollection.findOne({ code });
  if (!record) return null;

  await sessionCollection.updateOne(
    { code },
    { $addToSet: { userEmails: user.email } }
  );
  const id = record._id.toString();
  userCollection.updateOne({ email: user.email }, { $addToSet: { id } });

  return record;
}

export async function toggleBreak(sessionId: string) {
  await sessionCollection.updateOne(
    { _id: new ObjectId(sessionId) },
    { $push: { activityChanges: new Date() } }
  );
  return await getSessionById(sessionId);
}

export async function endSession(sessionId: string) {
  await sessionCollection.updateOne(
    { _id: new ObjectId(sessionId) },
    { $set: { hasEnded: true }, $push: { activityChanges: new Date() } }
  );
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
