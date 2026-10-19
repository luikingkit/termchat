import type { MessageStore } from '../interface/message-store.js';
import type { Message } from '../interface/message.js';
import type { StoredMessage } from '../interface/stored-message.js';

export class InMemoryStore implements MessageStore {
  private static instance: InMemoryStore | null = null;

  private messagesBySession = new Map<string, StoredMessage[]>();

  private constructor() {}

  static getInstance(): InMemoryStore {
    if (!InMemoryStore.instance) {
      InMemoryStore.instance = new InMemoryStore();
    }
    return InMemoryStore.instance;
  }

  list(sessionId: string): StoredMessage[] {
    return [...(this.messagesBySession.get(sessionId) ?? [])];
  }

  append(sessionId: string, msg: Message): StoredMessage {
    const list = this.messagesBySession.get(sessionId) ?? [];

    const stored = {
      ...msg,
      sessionId,
      createdAt: Date.now(),
    };

    list.push(stored);
    this.messagesBySession.set(sessionId, list);
    return stored;
  }
}
