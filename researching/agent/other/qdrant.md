```ts
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ url, apiKey });

// Upsert
await qdrant.upsert("docs", {
  points: [
    {
      id: pointId,
      vector,
      payload: {
        text: chunk,
        source: file,
      },
    },
  ],
});

// Search
const sources = await client.search("docs", { vector, limit });
const context = sources.map((r) => r.payload.text).join("\n---\n");
```
