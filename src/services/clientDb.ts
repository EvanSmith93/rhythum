import { generateCode } from "../utils/helpers";
import { Quote, Session, User } from "../utils/types";
import { LSHandler, Schema } from "./LSHandler";
import { v4 as uuidv4 } from "uuid";

// const defaultSessions: Session[] = [
//   {
//     id: uuidv4(),
//     code: generateCode(),
//     activityChanges: [
//       new Date("2025-01-03T17:28:00.000Z"),
//       new Date("2025-01-03T17:35:00.000Z"),
//       new Date("2025-01-03T17:47:00.000Z"),
//       new Date("2025-01-03T18:33:00.000Z"),
//       new Date("2025-01-03T18:55:00.000Z"),
//       new Date("2025-01-03T19:09:00.000Z"),
//     ],
//     hasEnded: true,
//   },
//   {
//     id: uuidv4(),
//     code: generateCode(),
//     activityChanges: [
//       new Date("2025-01-08T21:45:00.000Z"),
//       new Date("2025-01-08T22:31:00.000Z"),
//       new Date("2025-01-09T00:11:00.000Z"),
//     ],
//     hasEnded: true,
//   },
//   {
//     id: uuidv4(),
//     code: generateCode(),
//     activityChanges: [
//       new Date("2025-01-22T06:58:00.000Z"),
//       new Date("2025-01-22T06:58:30.000Z"),
//       new Date("2025-01-22T06:59:00.000Z"),
//       new Date("2025-01-22T07:03:00.000Z"),
//     ],
//     hasEnded: false,
//   },
// ];

// if (!localStorage.getItem("initialized")) {
//   new LSHandler().setItems(Schema.Sessions, defaultSessions);
//   localStorage.setItem("initialized", "true");
// }

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

export class ClientDb {
  LSHandler = new LSHandler();

  async getSessions() {
    return this.LSHandler.getItems(Schema.Sessions);
  }

  async getSessionById(sessionId: string) {
    const sessions = (await this.getSessions())!;
    return sessions.find((session) => session.id === sessionId);
  }

  async getSessionByCode(code: string) {
    const sessions = (await this.getSessions())!;
    return sessions.find((session) => session.code === code);
  }

  async startSession() {
    const newSession: Session = {
      id: uuidv4(),
      code: generateCode(),
      activityChanges: [new Date()],
      hasEnded: false,
    };
    return this.LSHandler.addItem(Schema.Sessions, newSession);
  }

  async toggleBreak(sessionId: string) {
    const session = (await this.getSessionById(sessionId))!;
    session.activityChanges.push(new Date());
    return this.LSHandler.updateItem(Schema.Sessions, session);
  }

  async endSession(sessionId: string) {
    const session = (await this.getSessionById(sessionId))!;
    session.hasEnded = true;
    session.activityChanges.push(new Date());
    this.LSHandler.updateItem(Schema.Sessions, session);
  }

  async register(email: string, password: string) {
    return await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": " application/json" },
      body: JSON.stringify({ email, password }),
    });
  }

  async login(email: string, password: string) {
    return await fetch("/api/auth", {
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser(): Promise<User> {
    const user = await fetch("/api/user/me", {
      method: "GET",
      headers: { "Content-Type": " application/json" },
    });
    return user.status === 200 ? user.json() : null;
  }

  async logout() {
    return await fetch("/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": " application/json" },
    });
  }

  async getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
}
