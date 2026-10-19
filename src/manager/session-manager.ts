import { ChatSession } from '../session/chat-session.js';
import { randomUUID } from 'node:crypto';

export class SessionManager {
  private static instance: SessionManager | null = null;

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  createSession(): Promise<ChatSession> {
    const sessionId = randomUUID();
    return Promise.resolve(new ChatSession(sessionId));
  }
}
