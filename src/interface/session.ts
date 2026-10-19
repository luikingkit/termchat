export interface Session {
  readonly sessionId: string;
  stream(prompt: string): AsyncIterable<string>;
  chat(prompt: string): Promise<string | undefined>;
}
