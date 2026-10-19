import 'dotenv/config';
import { SessionManager } from './manager/session-manager.js';

const sessionManager = SessionManager.getInstance();
const session = await sessionManager.createSession();

const prompt = 'introduce openai';

for await (const delta of session.stream(prompt)) {
  process.stdout.write(delta);
}
