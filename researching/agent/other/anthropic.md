```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey });

const response = await client.messages.create({
  model: "claude-3-5-sonnet-20240620",
  system: systemPrompt,
  messages: [
    {
      role: "user",
      content: userPrompt,
    },
  ],
  max_tokens: 1024,
});

const answer = response.content.find((c) => c.type === "text").text ?? "";
```
