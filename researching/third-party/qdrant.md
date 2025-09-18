```ts
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ url, apiKey });

// Upsert
const pointId = uuidv4();

await qdrant.upsert("docs", {
  points: [
    {
      id: pointId,
      vector,
      payload: {
        text: chunk,
      },
    },
  ],
});

// Search
const sources = await client.search("docs", { vector, limit });
const context = sources.map((r) => r.payload.text).join("\n---\n");
```
