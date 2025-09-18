import { openai } from "@llamaindex/openai";
import { agent } from "@llamaindex/workflow";
import fs from "fs";
import path from "path";

const systemPromptPath = path.resolve("./src/app/EventStormingExpert.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");
console.log(`debug:systemPromptPath`, systemPromptPath);

export const eventStormingFactory = async (reqBody: any) => {
  const myAgent = agent({
    systemPrompt,
    tools: [],
    llm: openai({
      baseURL: "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: "deepseek-chat",
    }),
  });

  return myAgent;
};
