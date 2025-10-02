## For me to build

```sh
# Run Neo4j on default bridge network
docker run \
  --name neo4j -d \
  -p7474:7474 -p7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -e NEO4JLABS_PLUGINS='["apoc"]' \
  -e APOC_IMPORT_FILE_ENABLED=true \
  -e APOC_EXPORT_FILE_ENABLED=true \
  neo4j:latest

# Run with docker-compose (build mode)
docker compose -f docker-compose-build.yml up -d

# Build docker image
docker build -t quochuydev/core-x-agent:0.0.1 .

# Push docker image
docker push quochuydev/core-x-agent:0.0.1
```

**Verify connection**:

```sh
# Neo4j - Login with neo4j/password
open http://localhost:7474

# Agent - Check if agent is running
curl http://localhost:8079/sse
```

**Clear the graph database**

```sql
MATCH (n) DETACH DELETE n
```

## For other team members use the MCP

### Run agent in local

```yml
# docker-compose.yml
version: "3.9"

services:
  core-x-agent:
    image: quochuydev/core-x-agent:0.0.1
    container_name: core-x-agent
    ports:
      - "8079:8079"
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=neo4j
      - NEO4J_PASSWORD=password
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    env_file:
      - .env
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
# Pull docker image
docker pull quochuydev/core-x-agent:0.0.1

# Create .env file with key OPENAI_API_KEY

# Run
docker compose up -d

# Check logs
docker compose logs core-x-agent -f

# Tools: `train_data` `search_knowledge_base`

# Test with inspector
npx @modelcontextprotocol/inspector --server-url http://localhost:8079/sse

# Test with claude code
claude mcp add --transport sse x-agent http://localhost:8079/sse
```
