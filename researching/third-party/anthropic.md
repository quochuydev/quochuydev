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

```sh
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3.5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user", "content": "Hello Claude, tell me something interesting about quantum gravity."
      }
    ]
  }'

curl https://api.z.ai/api/anthropic/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3.5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user", "content": "Hello Claude, tell me something interesting about quantum gravity."
      }
    ]
  }'
```
