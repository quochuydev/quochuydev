```tsx
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = "docs";

await pc.createIndexForModel({
  name: indexName,
  cloud: "aws",
  region: "us-east-1",
  embed: {
    model: "llama-text-embed-v2",
    fieldMap: {
      text: "chunk_text",
    },
  },
  waitUntilReady: true,
});
```

```sh
curl "https://api.pinecone.io/assistant/assistants" \
  -H "Api-Key: $PINECONE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "example-assistant",
  "instructions": "Answer in polite, short sentences. Use American English spelling and vocabulary."
}'
```
