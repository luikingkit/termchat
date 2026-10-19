import OpenAI from 'openai';

const AI_BASE_URL = process.env['AI_BASE_URL'];
const AI_API_KEY = process.env['AI_API_KEY'];

export const llm = new OpenAI({
  baseURL: AI_BASE_URL,
  apiKey: AI_API_KEY,
});
