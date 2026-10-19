# termchat

Chat with AI right in your terminal — a lightweight CLI for OpenAI and DeepSeek, built on the official OpenAI SDK. Streaming replies, conversation memory, and a single .env to configure it all.

**termchat** lets you talk to AI models without leaving your shell: no browser, no GUI, just your terminal.

## Features

- **Terminal-native** — an interactive CLI that stays out of your way.
- **OpenAI & DeepSeek** — switch providers through configuration; powered by the official `OpenAI` SDK.
- **Streaming responses** — replies appear token by token, just like a native chat.
- **Conversation memory** — context is preserved across messages within a session.
- **Single `.env` config** — all AI settings live in one place.

## Quick Start

### Prerequisites

- **Node.js** `>= 18`
- An API key for OpenAI and/or DeepSeek

### Install

```sh
git clone https://github.com/luikingkit/termchat.git
cd termchat
npm install
```

### Configure

Create a `.env` file in the project root:

```ini
AI_BASE_URL=REPLACE_WITH_YOUR_AI_BASE_URL
AI_API_KEY=REPLACE_WITH_YOUR_AI_API_KEY
AI_MODEL=REPLACE_WITH_YOUR_AI_MODEL
```

| Variable      | Description                           | Example                                                                       |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| `AI_BASE_URL` | Base URL of the OpenAI-compatible API | `https://api.openai.com/v1` (OpenAI)<br>`https://api.deepseek.com` (DeepSeek) |
| `AI_API_KEY`  | Your API key                          | `sk-...`                                                                      |
| `AI_MODEL`    | Model to chat with                    | `gpt-4o-mini` (OpenAI)<br>`deepseek-flash` (DeepSeek)                         |

### Run

```sh
npm start
```

You'll be dropped into an interactive prompt. Type your message and press <kbd>Enter</kbd>. Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to exit.

## License

MIT © [Lui King Kit](https://github.com/luikingkit)

## Support

- Issues: [GitHub Issues](https://github.com/luikingkit/termchat/issues)
- Source: [github.com/luikingkit/termchat](https://github.com/luikingkit/termchat)
