import { config } from "dotenv";
import { createNeo4jService } from "./tools/neo4j";
import { createOpenAIService } from "./tools/openai";

config();

const env = process.env as Record<string, string>;

async function insertData() {
  const neo4jService = createNeo4jService(
    "bolt://localhost:7687",
    "neo4j",
    "password"
  );

  const llmService = createOpenAIService(env.OPENAI_API_KEY);

  try {
    await neo4jService.deleteDocs();
    console.log("Database cleaned");

    const sampleDocs = [
      "Employees can create, edit, and delete their own expense requests",
      "Expense requests under 20,000,000 VND within department budget go to Manager then Finance only",
      "CEO users can approve any submitted request to immediately complete it",
      "System must maintain audit logs for minimum 2 years",
    ];

    for (let i = 0; i < sampleDocs.length; i++) {
      const doc = sampleDocs[i];
      const vector = await llmService.embed(doc);
      await neo4jService.upsertDocs(vector, doc, {
        source: "test-sample",
        index: i,
      });
    }
    console.log(`Inserted ${sampleDocs.length} documents`);
  } finally {
    await neo4jService.close();
  }
}

insertData().catch(console.error);
// npx tsx test-insert-neo4j.ts
