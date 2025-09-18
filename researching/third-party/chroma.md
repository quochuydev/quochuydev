```ts
import { ChromaClient } from "chromadb";

const client = new ChromaClient({ path: url });

// Create or get a collection
const collection = await client.getOrCreateCollection({
  name: "docs",
});

// Upsert
await collection.upsert({
  ids: [pointId.toString()],
  embeddings: [vector],
  metadatas: [
    {
      text,
    },
  ],
});

// Search
const results = await collection.query({
  queryEmbeddings: [vector],
  nResults: limit,
});

const context = results.documents[0].join("\n---\n");
```
