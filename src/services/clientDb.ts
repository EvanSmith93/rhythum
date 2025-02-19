import { Quote, Session, User } from "../utils/types";

export class db {
  private static async fetchJson<T extends object>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<T | null> {
    const res = await fetch(input, {
      ...init,
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? await res.json() : null;
  }

  static async getSessions() {
    return db.fetchJson<Session[]>("/api/sessions", { method: "GET" });
  }

  static async getSessionById(sessionId: string) {
    return db.fetchJson<Session>(`/api/sessions/id/${sessionId}`, {
      method: "GET",
    });
  }

  static async joinSession(code: string) {
    return db.fetchJson<Session>(`/api/sessions/join/${code}`, {
      method: "PUT",
    });
  }

  static async startSession() {
    return db.fetchJson<Session>("/api/sessions", { method: "POST" });
  }

  static async toggleBreak(sessionId: string) {
    return db.fetchJson<Session>(`/api/sessions/toggle/${sessionId}`, {
      method: "PUT",
    });
  }

  static async endSession(sessionId: string) {
    return db.fetchJson(`/api/sessions/end/${sessionId}`, { method: "PUT" });
  }

  static async register(email: string, password: string) {
    return db.fetchJson("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  static async login(email: string, password: string) {
    return db.fetchJson("/api/auth", {
      method: "PUT",
      body: JSON.stringify({ email, password }),
    });
  }

  static async getCurrentUser() {
    return db.fetchJson<User>("/api/auth/me", { method: "GET" });
  }

  static async logout() {
    return db.fetchJson("/api/auth", { method: "DELETE" });
  }

  static async getRandomQuote() {
    return db.fetchJson<Quote>("/api/quotes", { method: "GET" });
  }
}
