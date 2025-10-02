import { config } from "dotenv";
import { createNeo4jService } from "./tools/neo4j";
import { createOpenAIService } from "./tools/openai";

config();

const env = process.env as Record<string, string>;

async function testNeo4j() {
  const neo4jService = createNeo4jService(
    "bolt://localhost:7687",
    "neo4j",
    "password"
  );

  const llmService = createOpenAIService(env.OPENAI_API_KEY);

  try {
    const query = "Can CEO approve expense requests?";
    console.log(`Query: "${query}"`);

    const queryVector = await llmService.embed(query);
    const results = await neo4jService.searchDocs(queryVector, 3);

    console.log(`\nTop ${results.length} results:`);
    results.forEach((result, idx) => {
      console.log(`${idx + 1}. ${result}`);
    });

    console.log("\n✅ Test completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    throw error;
  } finally {
    await neo4jService.close();
  }
}

testNeo4j().catch(console.error);
// npx tsx test-query-neo4j.ts
