
import dotenv from 'dotenv';
import {
  Configuration,
  OpenAIApi
} from "openai";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORG = process.env.OPENAI_ORG;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);

export default class ChatBot {

  constructor(system = "") {

    this.system = system;
    this.messages = [];

    if (this.system) {
      this.messages.push({ role: "system", content: system });
    }
  }

  async execute(message) {
    this.messages.push({ role: "user", content: message });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: this.messages,
      temperature: 0.5,
    });

    const content = completion.data.choices[0]?.message?.content?.trim();

    this.messages.push({ role: "assistant", content });

    return content;
  }
}