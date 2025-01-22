import { Session } from "../utils/types";

const sessions: Session[] = [
  {
    id: "2",
    code: "RTUJV",
    activityChanges: [
      new Date("2025-01-22T06:58:00.000Z"),
      new Date("2025-01-22T06:58:30.000Z"),
      new Date("2025-01-22T06:59:00.000Z"),
      new Date("2025-01-22T07:03:00.000Z"),
    ],
    hasEnded: false,
  },
  {
    id: "1",
    code: "UQBLA",
    activityChanges: [
      new Date("2025-01-08T21:45:00.000Z"),
      new Date("2025-01-08T22:31:00.000Z"),
      new Date("2025-01-09T00:11:00.000Z"),
    ],
    hasEnded: true,
  },
  {
    id: "0",
    code: "PCJZW",
    activityChanges: [
      new Date("2025-01-03T17:28:00.000Z"),
      new Date("2025-01-03T17:35:00.000Z"),
      new Date("2025-01-03T17:47:00.000Z"),
      new Date("2025-01-03T18:33:00.000Z"),
      new Date("2025-01-03T18:55:00.000Z"),
      new Date("2025-01-03T19:09:00.000Z"),
    ],
    hasEnded: true,
  },
];

export class ClientDb {
  async getSessions(userId: string) {
    if (!userId) return;
    return sessions;
  }

  async getSessionById(userId: string, sessionId: string) {
    if (!userId) return;
    return sessions.find((session) => session.id === sessionId);
  }

  async getSessionByCode(userId: string, code: string) {
    if (!userId) return;
    return sessions.find((session) => session.code === code);
  }
}
