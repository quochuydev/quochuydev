```ts
// Embedding
const embedding = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: text,
});

const vector = embedding.data[0].embedding;

return vector;

// Chat
const response = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ],
});

return response.choices[0]?.message?.content;

// Generate image
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Generate complete product details for this image:",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`,
          },
        },
      ],
    },
  ],
  max_tokens: 1500,
  temperature: 0.7,
});

const content = response.choices[0].message.content;
```
