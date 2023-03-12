# ZhatZPT

A Telegram chatbot that uses the ChatGPT API, with support for Telegram's [MarkdownV2](https://core.telegram.org/bots/api#markdownv2-style) format.

## Usage

### Clone and install the dependencies

Clone the repo, and then install the dependencies

```bash
npm install
```

### Set the Telegram commands

Talk to [@BotFather](https://telegram.me/BotFather)
to create the bot, obtain the bot token,
then use `/setcommands` to create the commands.

Here are the commands that I have defined:

```
reset - Reset Zhat's memory
```

### Run the chatbot

Set the OpenAI API Key and Telegram bot token
you have obtained in the previous step,
then run the server.

```bash
export BOT_TOKEN=xxx
export OPENAI_API_KEY=xxx

node src/index.js
```

## Licence

[MIT](./LICENCE).

