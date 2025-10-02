# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a knowledge base system that uses **LlamaIndex + Neo4j + MCP (Model Context Protocol)** to build an AI-powered graph-based RAG (Retrieval Augmented Generation) system. The system ingests domain knowledge documents and creates a queryable property graph for supporting Product Managers, Business Analysts, and Sales teams with feature recommendations and domain insights.

## Environment Setup

**Python Version**: 3.11.9 (managed via pyenv)

**Key Setup Commands**:

```bash
# Set Python version
pyenv local 3.11.9

# Install dependencies
pyenv exec pip install -r requirements.txt

# Start Neo4j (local)
docker run \
  --name neo4j -d \
  -p7474:7474 -p7687:7687 \
  -e NEO4J_AUTH=neo4j/Qwerty@123 \
  -e NEO4JLABS_PLUGINS='["apoc"]' \
  -e APOC_IMPORT_FILE_ENABLED=true \
  -e APOC_EXPORT_FILE_ENABLED=true \
  neo4j:latest

# Copy APOC plugin (if needed)
docker cp ./apoc-5.26.12-core.jar neo4j:/plugins/
```

**Environment Variables** (`.env`):

- `NEO4J_URI`: Neo4j connection (e.g., `bolt://localhost:7687`)
- `NEO4J_USER`: Default is `neo4j`
- `NEO4J_PASSWORD`: Password for Neo4j
- `OPENAI_API_KEY`: Required for LLM and embeddings

## Running the System

### MCP Server (FastAPI)

```bash
# Start the server
uvicorn mcp_server:app --reload --host 0.0.0.0 --port 8088
```

**API Endpoints**:

- `GET /` - Health check
- `GET /init` - Initialize index from documents in `training_data/`
- `GET /query?q=<query>` - Query the knowledge graph
- `GET /clear` - Clear all Neo4j data

## Architecture

### Core Components

1. **Neo4j Property Graph Store**

   - Uses `Neo4jPropertyGraphStore` from LlamaIndex
   - Connection: `bolt://localhost:7687` or `bolt://neo4j:7687` (in Docker)
   - Stores entities, relationships, and embeddings for RAG

2. **LlamaIndex PropertyGraphIndex**

   - Ingests documents from `training_data/` directory
   - Generates up to 10 triplets per chunk (`max_triplets_per_chunk=10`)
   - Includes embeddings for semantic search
   - Uses OpenAI GPT-4.1 for knowledge extraction

3. **FastAPI MCP Server** (`mcp_server.py`)

   - Provides HTTP endpoints for initialization, querying, and clearing
   - Lazy-loads the index on first query
   - Returns query results as JSON

4. **Function Agent** (`index.py`)
   - Wraps Neo4j Cypher queries as tools
   - Acts as an AI Engineer/Solution Engineer assistant
   - Recommends related features based on graph traversal

### Data Flow

1. **Ingestion**: Documents in `training_data/` → PropertyGraphIndex → Neo4j
2. **Query**: User query → Agent/QueryEngine → Neo4j Cypher → Response
3. **Recommendation**: Agent uses `neo4j_cypher_query` tool to fetch related features/entities

### Training Data Structure

Place domain knowledge markdown files in `training_data/`:

Use **camelCase** for entity and field names to maintain consistency across system and API.

## Key Files

- **`mcp_server.py`**: FastAPI-based MCP server for HTTP API access
- **`requirements.txt`**: All Python dependencies
- **`Dockerfile`**: Container definition for deployment
- **`docker-compose.yml`**: Orchestrates Neo4j + knowledge-base services
- **`training_data/`**: Directory containing domain knowledge markdown files

## Common Workflows

### Adding New Domain Knowledge

1. Create a new markdown file in `training_data/` following the template structure
2. Use camelCase for technical terms, entities, and fields
3. Restart the server or call `/init` to re-index
4. Query via `/query?q=<your query>` or use the agent in `index.py`

### Querying the Knowledge Base

**HTTP API**:

```bash
curl "http://localhost:8088/query?q=get concepts about user management flow"
```

## Important Notes

- Always use Neo4j browser at `http://localhost:7474` (credentials: `neo4j/password`) to visualize the graph
- Use `docker-compose run --rm knowledge-base ls -l /app/training_data` to verify training data mounted correctly in container
