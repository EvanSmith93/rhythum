import { Quote, Session, User } from "../utils/types";

export class ClientDb {
  async getSessions() {
    const res = await fetch("/api/sessions", {
      method: "GET",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? ((await res.json()) as Session[]) : null;
  }

  async getSessionById(sessionId: string) {
    const res = await fetch(`/api/sessions/id/${sessionId}`, {
      method: "GET",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? ((await res.json()) as Session) : null;
  }

  async joinSession(code: string) {
    const res = await fetch(`/api/sessions/join/${code}`, {
      method: "PUT",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? ((await res.json()) as Session) : null;
  }

  async startSession() {
    const res = await fetch(`/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? ((await res.json()) as Session) : null;
  }

  async toggleBreak(sessionId: string) {
    const res = await fetch(`/api/sessions/toggle/${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? ((await res.json()) as Session) : null;
  }

  async endSession(sessionId: string) {
    await fetch(`/api/sessions/end/${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": " application/json" },
    });
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
    const res = await fetch("/api/user/me", {
      method: "GET",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? await res.json() : null;
  }

  async logout() {
    return await fetch("/api/auth", {
      method: "DELETE",
      headers: { "Content-Type": " application/json" },
    });
  }

  async getRandomQuote(): Promise<Quote> {
    const res = await fetch("/api/quote", {
      method: "GET",
      headers: { "Content-Type": " application/json" },
    });
    return res.status === 200 ? await res.json() : null;
  }
}
