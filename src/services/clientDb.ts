import { Quote, Session, User } from "../utils/types";

export class ClientDb {
  private async fetchJson<T extends object>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<T | null> {
    const res = await fetch(input, {
      ...init,
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? await res.json() : null;
  }

  async getSessions() {
    return this.fetchJson<Session[]>("/api/sessions", { method: "GET" });
  }

  async getSessionById(sessionId: string) {
    return this.fetchJson<Session>(`/api/sessions/id/${sessionId}`, {
      method: "GET",
    });
  }

  async joinSession(code: string) {
    return this.fetchJson<Session>(`/api/sessions/join/${code}`, {
      method: "PUT",
    });
  }

  async startSession() {
    return this.fetchJson<Session>("/api/sessions", { method: "POST" });
  }

  async toggleBreak(sessionId: string) {
    return this.fetchJson<Session>(`/api/sessions/toggle/${sessionId}`, {
      method: "PUT",
    });
  }

  async endSession(sessionId: string) {
    return this.fetchJson(`/api/sessions/end/${sessionId}`, { method: "PUT" });
  }

  async register(email: string, password: string) {
    return this.fetchJson("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async login(email: string, password: string) {
    return this.fetchJson("/api/auth", {
      method: "PUT",
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.fetchJson<User>("/api/auth/me", { method: "GET" });
  }

  async logout() {
    return this.fetchJson("/api/auth", { method: "DELETE" });
  }

  async getRandomQuote() {
    return this.fetchJson<Quote>("/api/quotes", { method: "GET" });
  }
}
