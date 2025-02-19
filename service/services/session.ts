import { Session, User } from "../types";
import { v4 as uuidv4 } from "uuid";

const sessions: Session[] = [];

export async function getSessions(userEmail: string) {
  return sessions.filter((session) => session.userEmails.includes(userEmail));
}

export async function getSessionById(userEmail: string, sessionId: string) {
  const userSessions = await getSessions(userEmail);
  return userSessions.find((session) => session.id === sessionId) ?? null;
}

export async function startSession(user: User) {
  const newSession: Session = {
    id: uuidv4(),
    code: generateCode(),
    activityChanges: [new Date()],
    hasEnded: false,
    userEmails: [user.email],
  };
  user.sessionIds.push(newSession.id);
  sessions.push(newSession);
  return newSession;
}

export async function joinSession(user: User, code: string) {
  const session = sessions.find((session) => session.code === code);
  if (!session) return null;

  if (!session.userEmails.includes(user.email)) {
    user.sessionIds.push(session.id);
    session.userEmails.push(user.email);
  }
  return session;
}

export async function toggleBreak(userEmail: string, sessionId: string) {
  const session = await getSessionById(userEmail, sessionId);
  if (!session) throw Error("Session does not exist");
  session.activityChanges.push(new Date());
  return session;
}

export async function endSession(userEmail: string, sessionId: string) {
  const session = await getSessionById(userEmail, sessionId);
  if (!session) throw Error("Session does not exist");
  session.activityChanges.push(new Date());
  session.hasEnded = true;
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
