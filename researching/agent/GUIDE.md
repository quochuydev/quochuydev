## For me to build

```sh
# Run with docker-compose (build mode)
docker compose -f docker-compose-build.yml up -d

# Build docker image
docker build -t quochuydev/core-x-agent:0.0.4 .

# Push docker image
docker push quochuydev/core-x-agent:0.0.4
```

**Verify connection**:

```sh
# Neo4j - Login with neo4j/password
open http://localhost:7474

# Agent - Check if agent is running
curl http://localhost:8079/sse
```

## For other team members use the MCP

### Run agent in local

```sh
# Create .env file
cp .env.example .env

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

**To change system prompt**

1. Edit `agent.md`
2. Restart agent `docker compose restart core-x-agent`

**To clear the neo4j graph database**

```sql
MATCH (n) DETACH DELETE n
```
