import { Quote, Session } from "../utils/types";
import { LSHandler, Schema } from "./LSHandler";

const defaultSessions: Session[] = [
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

const quotes: Quote[] = [
  {
    text: "Through discipline comes freedom.",
    author: "Aristotle",
  },
  {
    text: "Question everything. Learn something. Answer nothing.",
    author: "Euripides",
  },
  {
    text: "True life is lived when tiny changes occur.",
    author: "Leo Tolstoy",
  },
  {
    text: "Some people don't like change, but you need to embrace change if the alternative is disaster.",
    author: "Elon Musk",
  },
  {
    text: "If you don't know where you're going, you will probably end up somewhere else.",
    author: "Laurence J. Peter",
  },
];

if (!localStorage.getItem("initialized")) {
  new LSHandler().setItems(Schema.Sessions, defaultSessions);
  localStorage.setItem("initialized", "true");
}

export class ClientDb {
  LSHandler = new LSHandler();

  async getSessions(userId: string) {
    if (!userId) return;
    return this.LSHandler.getItems(Schema.Sessions);
  }

  async getSessionById(userId: string, sessionId: string) {
    if (!userId) return;
    const sessions = (await this.getSessions(userId))!;
    return sessions.find((session) => session.id === sessionId);
  }

  async getSessionByCode(userId: string, code: string) {
    if (!userId) return;
    const sessions = (await this.getSessions(userId))!;
    return sessions.find((session) => session.code === code);
  }

  async endSession(userId: string, sessionId: string) {
    if (!userId) return;
    const session = (await this.getSessionById(userId, sessionId))!;
    session.hasEnded = true;
    session.activityChanges.push(new Date());
    this.LSHandler.updateItem(Schema.Sessions, session);
  }

  async getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}
