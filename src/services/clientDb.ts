import { Session } from "../utils/types";

const sessions: Session[] = [
  {
    id: "2",
    startTime: new Date("2025-01-15T19:26:00.000Z"),
    endTime: null,
    code: "RTUJV",
  },
  {
    id: "1",
    startTime: new Date("2025-01-08T21:45:00.000Z"),
    endTime: new Date("2025-01-09T00:11:00.000Z"),
    code: "UQBLA",
  },
  {
    id: "0",
    startTime: new Date("2025-01-03T17:28:00.000Z"),
    endTime: new Date("2025-01-03T19:09:00.000Z"),
    code: "PCJZW",
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
}
