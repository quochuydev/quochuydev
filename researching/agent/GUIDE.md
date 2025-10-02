## For me to build

```sh
# Build docker image
docker build -t quochuydev/core-x-agent:0.0.1 .

# Push docker image
docker push quochuydev/core-x-agent:0.0.1

# Run with docker-compose (build mode)
docker-compose  -f docker-compose-build.yml up -d
```

## For other team members use the MCP

### Run agent in local

```yml
version: "3.9"

services:
  core-x-agent:
    image: quochuydev/core-x-agent:0.0.1
    container_name: core-x-agent
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=neo4j
      - NEO4J_PASSWORD=password
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    ports:
      - "8079:8079"
    depends_on:
      - neo4j

  neo4j:
    image: neo4j:latest
    container_name: neo4j
    environment:
      - NEO4J_AUTH=neo4j/password
      - NEO4JLABS_PLUGINS=["apoc"]
      - NEO4J_PLUGINS=["apoc"]
    ports:
      - "7474:7474" # browser
      - "7687:7687" # bolt
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs

volumes:
  neo4j_data:
  neo4j_logs:
```

```sh
docker pull quochuydev/core-x-agent:0.0.1

# Create .env file with key OPENAI_API_KEY

docker-compose up -d

docker-compose logs -f core-x-agent
```

### Use the agent example

```json
{
  "mcpServers": {
    "core-x-agent": {
      "serverUrl": "http://localhost:8079/sse",
      "headers": {}
    }
  }
}
```

**2. Query the agent** via MCP tools:

- **train_data**: Store new domain knowledge into the agent
  ```
  Example: Feed feature specifications, requirements docs, or clarifications
  ```
- **search_knowledge_base**: Ask questions about stored requirements

  ```
  Example: "What are the approval workflow rules for expenses over 20M VND?"
  Example: "What entities are involved in budget management?"
  Example: "Can employees edit expense requests after submission?"
  ```

**3. Verify connection**:

```sh
# Check if agent is running
curl http://localhost:8079/sse

# Check Neo4j is accessible
open http://localhost:7474
# Login with neo4j/password
```

To clear the graph database

```sql
MATCH (n) DETACH DELETE n
```
