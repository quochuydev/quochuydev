import {
  createSdkMcpServer,
  query,
  tool,
} from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.z.ai/api/anthropic",
});

const generateChartTool = tool(
  "generate_chart_config",
  "Generate Chart.js configuration JSON inside ```chartjs``` blocks",
  {
    prompt: z.string().describe("User's natural language chart description"),
  },
  async (args) => {
    const systemPrompt = `
You are an AI that converts a user's chart description into valid Chart.js config JSON inside \`\`\`chartjs\`\`\` code blocks.
Use bright, bold colors. No explanations or text outside the block.
`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: args.prompt,
        },
      ],
      max_tokens: 1024,
    });

    const text = response.content.find((c) => c.type === "text")?.text ?? "";
    console.log(`debug:text`, text);

    return {
      content: [{ type: "text", text }],
    };
  }
);

const customServer = createSdkMcpServer({
  name: "my-custom-tools",
  version: "1.0.0",
  tools: [generateChartTool],
});

async function* generateMessages() {
  yield {
    type: "user" as const,
    message: {
      role: "user" as const,
      content:
        "Top 10 GDP countries in the world in 2025, return as line chart and pie chart.",
    },
  };
}

for await (const message of query({
  prompt: generateMessages() as any,
  options: {
    mcpServers: {
      "my-custom-tools": customServer,
    },
    allowedTools: ["mcp__my-custom-tools__generate_chart_config"],
    maxTurns: 3,
  },
})) {
  if (message.type === "assistant") {
    console.log("assistant", message.message.content);
  }

  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
    fs.writeFileSync("result.md", message.result);
  }
}
