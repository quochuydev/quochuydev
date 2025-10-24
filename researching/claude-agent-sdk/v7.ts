import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const anthropic = new Anthropic({
  baseURL: "https://api.z.ai/api/anthropic",
});

const result = await anthropic.beta.messages.create({
  model: "glm-4.6-cc-max",
  max_tokens: 1000,
  system: fs.readFileSync("v7.analyze.md", "utf-8").trim(),
  messages: [
    {
      role: "user",
      content: fs.readFileSync("v7.prompt.md", "utf-8"),
    },
  ],
});

if (result.content[0].type !== "text") {
  console.log(`debug:result`, result);
  throw new Error("Result is not text");
}

const text = result.content[0].text;

console.log(`debug:result`, text);
fs.writeFileSync("v7.prompt-yaml.md", text);
