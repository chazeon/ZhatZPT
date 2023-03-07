import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { completeChat } from "./chat.js";
import { tfmEscape } from "./tfm.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

const chats = {}

class Chat {

    constructor() {
        this.reset()
    }

    reset() {
        this.messages = [
            { "role": "system", "content": "You are a helpful assistant named ZhatZPT." },
            { "role": "assistant", "content": "Welcome" },
        ]
    }

    async complete() {
        const response = await completeChat(this.messages)
        this.messages.push(response)
        return response.content
    }

    async getResponse(message) {
        this.messages.push({
            role: "user",
            content: message,
        })
        const responseContent = await this.complete()
        return responseContent
    }

}

bot.start((ctx) => {
    const chatId = ctx.message.chat.id
    chats[chatId] = new Chat()
    ctx.reply('Welcome')
})

bot.command("reset", (ctx) => {
    const chatId = ctx.message.chat.id
    chats[chatId] = new Chat()
    ctx.reply('Welcome')
})

bot.on(message('text'), async (ctx) => {
    const chatId = ctx.message.chat.id
    const chat = chats[chatId]
    let text = await chat.getResponse(ctx.message.text)
    let escaped = await tfmEscape(text)
    console.log(escaped)
    try {
        await ctx.reply({
            text: escaped,
            parse_mode: "MarkdownV2"
        })
    }
    catch (error) {
        await ctx.reply({ text })
    }
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
