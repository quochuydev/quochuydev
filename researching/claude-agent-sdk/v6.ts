import { query } from "@anthropic-ai/claude-agent-sdk";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const anthropic = new Anthropic({
  baseURL: "https://api.z.ai/api/anthropic",
});

const result = await anthropic.beta.messages.create({
  model: "glm-4.6-cc-max",
  max_tokens: 1000,
  system: fs.readFileSync("v6.analyze.simple.md", "utf-8").trim(),
  messages: [
    {
      role: "user",
      content: fs.readFileSync("v6.prompt.md", "utf-8"),
    },
  ],
});

if (result.content[0].type !== "text") {
  console.log(`debug:result`, result);
  throw new Error("Result is not text");
}

const text = result.content[0].text;

console.log(`debug:result`, text);
fs.writeFileSync("v6.prompt-yaml.md", text);

// const esResult = await anthropic.beta.messages.create({
//   model: "glm-4.6-cc-max",
//   max_tokens: 1000,
//   system: fs.readFileSync("v6.event-storming-os.md", "utf-8").trim(),
//   messages: [
//     {
//       role: "user",
//       content: `
// Generate draw.io XML from this specification:

// ${text}`,
//     },
//   ],
// });

// if (esResult.content[0].type !== "text") {
//   console.log(`debug:esResult`, esResult);
//   throw new Error("esResult is not text");
// }

// const content = esResult.content[0].text;
// console.log("\n✅ content:", content);

const response = query({
  prompt: `
Generate draw.io XML from this specification:

${text}`,
  options: {
    agents: {
      generate_draw_io: {
        description: "Generate drawio xml from event storming yaml",
        tools: ["Read", "Edit", "Write"],
        prompt: fs.readFileSync("v6.event-storming-os.md", "utf-8").trim(),
      },
    },
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
    },
    allowedTools: ["Read", "Edit", "Write"],
  },
});

for await (const message of response) {
  if (message.type === "assistant") {
    for (const element of message.message.content) {
      if (element.type === "tool_use") {
        console.log("🤖 Tool Use:", element.type, element.name);
      }
    }
  }

  if (message.type === "user") {
    console.log("👤 User:", message.message.content);
  }

  if (message.type === "result") {
    if (message.subtype === "success") {
      console.log("\n✅ Result:", message.result);
    }
  }
}
