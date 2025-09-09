import { CloudClient } from "chromadb";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export function createChromaService(apiKey: string | undefined) {
  if (!apiKey) throw new Error("CHROMA_API_KEY is not defined");

  const client = new CloudClient({ apiKey });

  // Upsert
  async function upsertDocs(fileName: string, vector: number[]) {
    const pointId = uuidv4();

    const collection = await client.getOrCreateCollection({
      name: "docs",
      metadata: { "hnsw:space": "cosine" }, // or "l2", "ip" depending on your use case
    });

    console.log(`debug:collection.metadata`, collection.metadata);

    await collection.add({
      ids: [pointId],
      embeddings: [vector],
      metadatas: [
        {
          fileName,
        },
      ],
    });

    return {
      pointId,
    };
  }

  // Search
  async function searchDocs(vector: number[], limit = 10): Promise<string> {
    const collection = await client.getOrCreateCollection({
      name: "docs",
    });

    const results = await collection.query({
      queryEmbeddings: [vector],
      nResults: limit,
    });

    const context = results.documents[0].join("\n---\n");

    return context;
  }

  return { upsertDocs, searchDocs };
}
