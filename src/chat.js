import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function completeChat(messages) {

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    })

    return completion.data.choices[0].message
}
