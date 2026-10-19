import 'dotenv/config';
import { SessionManager } from './manager/session-manager.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import ora from 'ora';

const sessionManager = SessionManager.getInstance();
const session = await sessionManager.createSession();

// Clear the screen
output.write('\u001b[H\u001b[2J\u001b[3J');

const rl = readline.createInterface({ input, output, prompt: 'Ask: ' });

rl.prompt();
rl.on('line', async (input) => {
  output.write('\n');
  const spinner = ora('thinking').start();

  const stopSpinner = () => {
    if (spinner.isSpinning) {
      spinner.stop();
      // Clear the spinner line
      output.write('\r\x1b[K');
    }
  };

  try {
    /**
     * Streaming chat
     */
    for await (const delta of session.stream(input)) {
      stopSpinner();
      output.write(delta);
    }

    /**
     * Non-streaming chat
     */
    // const reply = await session.chat(input);
    // reply && output.write(reply);
  } catch (error) {
    stopSpinner();
    output.write(
      `[error] ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    stopSpinner();
    output.write('\n\n\n');
    rl.prompt();
  }
});
