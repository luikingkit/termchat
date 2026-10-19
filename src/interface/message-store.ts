import type { Message } from './message.js';
import type { StoredMessage } from './stored-message.js';

export interface MessageStore {
  list(sessionId: string): StoredMessage[];
  append(sessionId: string, msg: Message): StoredMessage;
}
