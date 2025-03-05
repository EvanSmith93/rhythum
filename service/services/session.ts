import { ObjectId } from "mongodb";
import { db } from "../db/db";
import { Session, User } from "../types";

const session = db.collection<Omit<Session, "_id">>("session");

export async function getSessions(userEmail: string) {
  const response = session.find({ userEmails: userEmail });
  return await response.toArray();
}

export async function getSessionById(userEmail: string, sessionId: string) {
  return await session.findOne({
    userEmails: userEmail,
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

  const id = (await session.insertOne(data)).insertedId.toString();
  user.sessionIds.push(id);

  return { id };
}

export async function joinSession(user: User, code: string) {
  const record = await session.findOne({ code });
  if (!record) return null;

  await session.updateOne({ code }, { $addToSet: { userEmails: user.email } });
  user.sessionIds.push(record._id.toString());

  return record;
}

export async function toggleBreak(userEmail: string, sessionId: string) {
  await session.updateOne(
    { _id: new ObjectId(sessionId) },
    { $push: { activityChanges: new Date() } }
  );
  return await getSessionById(userEmail, sessionId);
}

export async function endSession(userEmail: string, sessionId: string) {
  await session.updateOne(
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
