import { CloudClient } from "chromadb";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export function createChromaService(apiKey: string | undefined) {
  if (!apiKey) throw new Error("CHROMA_API_KEY is not defined");

  const client = new CloudClient({ apiKey });

  // Upsert
  async function upsertDocs(
    vector: number[],
    document: string,
    metadata: Record<string, boolean | number | string | null>
  ) {
    const pointId = uuidv4();

    const collection = await client.getOrCreateCollection({
      name: "docs",
      metadata: {
        "hnsw:space": "cosine",
      },
    });

    await collection.add({
      ids: [pointId],
      embeddings: [vector],
      metadatas: [metadata],
      documents: [document],
    });
  }

  // Search
  async function searchDocs(vector: number[], limit = 10): Promise<string> {
    const collection = await client.getOrCreateCollection({
      name: "docs",
      metadata: {
        "hnsw:space": "cosine",
      },
    });

    const results = await collection.query({
      queryEmbeddings: [vector],
      nResults: limit,
    });

    const context = results.documents[0].join("\n---\n");

    return context;
  }

  async function deleteDocs() {
    await client.deleteCollection({ name: "docs" });
  }

  return { upsertDocs, searchDocs, deleteDocs };
}
