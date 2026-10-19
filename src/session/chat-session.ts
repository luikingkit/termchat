import type { Session } from '../interface/session.js';
import type { Message } from '../interface/message.js';
import { llm } from '../llm/index.js';
import { InMemoryStore } from '../msg-store/index.js';

export class ChatSession implements Session {
  private readonly msgStore = InMemoryStore.getInstance();

  constructor(
    public readonly sessionId: string,
    private readonly model: string | undefined = process.env['AI_MODEL'],
  ) {}

  /**
   * Builds the complete message list for the LLM request,
   * returns undefined when the configuration or parameters are invalid.
   */
  private buildMessages(prompt: string): Message[] | undefined {
    if (!this.model) {
      console.warn('[ChatSession] MISSING CONFIG: AI_MODEL');
      return;
    }

    if (!prompt) return;

    const history = this.msgStore.list(this.sessionId);
    return [
      ...history.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: prompt },
    ];
  }

  /**
   * Atomically persists one conversation turn (user + assistant).
   */
  private persist(prompt: string, reply: string): void {
    this.msgStore.append(this.sessionId, { role: 'user', content: prompt });
    this.msgStore.append(this.sessionId, { role: 'assistant', content: reply });
  }

  async *stream(prompt: string): AsyncIterable<string> {
    const messages = this.buildMessages(prompt);
    if (!messages) return;

    const stream = await llm.chat.completions.create({
      model: this.model!,
      messages,
      stream: true,
    });

    let reply = '';
    try {
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          reply += delta;
          yield delta;
        }
      }
    } finally {
      /**
       * Keeps the content generated, even if it breaks early or throws.
       */
      if (reply) {
        this.persist(prompt, reply);
      }
    }
  }

  async chat(prompt: string): Promise<string | undefined> {
    const messages = this.buildMessages(prompt);
    if (!messages) return;

    const completion = await llm.chat.completions.create({
      model: this.model!,
      messages,
    });

    const reply = completion.choices[0]?.message.content;
    if (!reply) return;

    this.persist(prompt, reply);
    return reply;
  }
}
