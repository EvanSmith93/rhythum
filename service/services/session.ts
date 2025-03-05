import { ObjectId } from "mongodb";
import { db } from "../db/db";
import { Session, User } from "../types";

// const sessions: Session[] = [];
const session = db.collection<Omit<Session, "_id">>("session");

export async function getSessions(userEmail: string) {
  // return sessions.filter((session) => session.userEmails.includes(userEmail));
  const cursor = session.find({ userEmails: userEmail });
  return await cursor.toArray();
}

export async function getSessionById(userEmail: string, sessionId: string) {
  // const userSessions = await getSessions(userEmail);
  // return userSessions.find((session) => session.id === sessionId) ?? null;
  return await session.findOne({
    userEmails: userEmail,
    _id: new ObjectId(sessionId),
  });
}

export async function startSession(user: User) {
  const data: Omit<Session, "_id"> = {
    // id: uuidv4(),
    code: generateCode(),
    activityChanges: [new Date()],
    hasEnded: false,
    userEmails: [user.email],
  };
  // sessions.push(newSession);
  const id = (await session.insertOne(data)).insertedId.toString();
  user.sessionIds.push(id);
  return { id };
}

export async function joinSession(user: User, code: string) {
  // const session = sessions.find((session) => session.code === code);
  // if (!session) return null;
  const record = await session.findOne({ code });
  if (!record) return null;

  await session.updateOne({ code }, { $addToSet: { userEmails: user.email } });
  user.sessionIds.push(record._id.toString());

  // if (!session.userEmails.includes(user.email)) {
  //   user.sessionIds.push(session.id);
  //   session.userEmails.push(user.email);
  // }
  return record;
}

export async function toggleBreak(userEmail: string, sessionId: string) {
  // const session = await getSessionById(userEmail, sessionId);
  // if (!session) throw Error("Session does not exist");
  // session.activityChanges.push(new Date());
  await session.updateOne(
    { _id: new ObjectId(sessionId) },
    { $push: { activityChanges: new Date() } }
  );
  return await getSessionById(userEmail, sessionId);
}

export async function endSession(userEmail: string, sessionId: string) {
  // const session = await getSessionById(userEmail, sessionId);
  // if (!session) throw Error("Session does not exist");
  // session.activityChanges.push(new Date());
  // session.hasEnded = true;
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
