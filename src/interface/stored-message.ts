import type { Message } from './message.js';

export interface StoredMessage extends Message {
  sessionId: string;
  createdAt: number;
}
