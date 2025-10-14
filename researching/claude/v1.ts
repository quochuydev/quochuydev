import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import fs from "fs";
import path from "path";
import { z } from "zod";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.z.ai/api/anthropic",
});

const main = async () => {
  const stream = await anthropic.beta.messages.toolRunner(
    {
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1000,
      tools: [
        betaZodTool({
          name: "list_files",
          description: "List all files in the current directory",
          inputSchema: z.object({}),
          run: ({}) => {
            const files = fs.readdirSync("./src");
            return JSON.stringify(files);
          },
        }),
        betaZodTool({
          name: "write_file",
          description: "Write a file to the current directory",
          inputSchema: z.object({
            file_name: z.string(),
            content: z.string(),
          }),
          run: ({ file_name, content }) => {
            fs.writeFileSync(path.join("./src", file_name), content);
            return `Wrote file ${file_name}`;
          },
        }),
      ],
      mcp_servers: [
        {
          type: "url",
          url: "http://example-server.modelcontextprotocol.io/sse",
          name: "example",
          authorization_token: "YOUR_TOKEN",
          tool_configuration: {
            enabled: true,
            allowed_tools: ["echo", "add"],
          },
        },
      ],
      messages: [
        {
          role: "user",
          content: `get all files, if you see main.ts file, write the log "hello world"`,
        },
      ],
    },
    {
      headers: {
        "anthropic-beta": "mcp-client-2025-04-04",
      },
    }
  );

  console.log(`debug:stream`, stream);
};

main();
