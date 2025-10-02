import neo4j, { Driver, Session } from "neo4j-driver";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export function createNeo4jService(
  uri: string,
  user: string,
  password: string
) {
  if (!uri || !user || !password) {
    throw new Error("Neo4j connection details are not fully defined");
  }

  const driver: Driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

  // Upsert
  async function upsertDocs(
    vector: number[],
    document: string,
    metadata: Record<string, boolean | number | string | null>
  ) {
    const session: Session = driver.session();
    const pointId = uuidv4();

    try {
      await session.run(
        `
        MERGE (d:Doc {id: $id})
        SET d.document = $document,
            d.vector = $vector,
            d += $metadata
        `,
        {
          id: pointId,
          document,
          vector,
          metadata,
        }
      );
    } finally {
      await session.close();
    }
  }

  // Search by cosine similarity
  async function searchDocs(vector: number[], limit = 10): Promise<string[]> {
    const session: Session = driver.session();

    try {
      const result = await session.run(
        `
        MATCH (d:Doc)
        WHERE d.vector IS NOT NULL
        WITH d, gds.similarity.cosine(d.vector, $queryVector) AS score
        ORDER BY score DESC
        LIMIT $limit
        RETURN d.document AS document
        `,
        { queryVector: vector, limit }
      );

      return result.records.map((r) => r.get("document"));
    } finally {
      await session.close();
    }
  }

  async function deleteDocs() {
    const session: Session = driver.session();

    try {
      await session.run(`MATCH (d:Doc) DETACH DELETE d`);
    } finally {
      await session.close();
    }
  }

  async function close() {
    await driver.close();
  }

  return { upsertDocs, searchDocs, deleteDocs, close };
}
