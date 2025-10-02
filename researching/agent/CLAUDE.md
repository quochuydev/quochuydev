# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered agent system that uses MCP (Model Context Protocol) to provide RAG (Retrieval-Augmented Generation) capabilities. The system stores domain knowledge in a vector database (Neo4j) and allows clients to query it via MCP tools.

## Development Commands

### Running the MCP Server

```sh
npm start
# Starts MCP server on http://localhost:8079/sse
```

### Available Scripts

```sh
npm run analyze <filename>  # Analyze requirements from ./requirements/<filename>.md
npm run learn              # Ingest training data from ./docs into vector DB
npm run clean              # Clean/reset the vector database
npm run generate           # Generate output (context-dependent)
npm run store              # Store data into vector DB
```

## Architecture

### Core Components

1. **MCP Server** (`agent.ts`):

   - Exposes two main tools via MCP protocol:
     - `search_knowledge_base`: Queries the knowledge base using RAG
     - `train_data`: Stores custom training data (chunked & embedded)
   - Uses SSE (Server-Sent Events) transport on `/sse` endpoint
   - Handles POST requests on `/messages` endpoint

2. **Vector Database** (`tools/neo4j.ts`):

   - Uses Neo4j graph database for vector storage
   - Stores documents as nodes with embeddings
   - Performs cosine similarity search for retrieval
   - Connection: `bolt://localhost:7687` (configurable via env vars)

3. **LLM Service** (`tools/openai.ts`):

   - OpenAI GPT-4.1 for text generation
   - `text-embedding-3-small` for embeddings
   - Provides `generateAnswer()` and `embed()` methods

4. **Text Processing** (`utils.ts`):
   - `chunkText()`: Splits documents into 8000-char chunks for embedding

### Data Flow

1. **Training**: Documents → chunked → embedded → stored in Neo4j as Doc nodes
2. **Query**: User query → embedded → cosine similarity search → retrieve context → GPT-4.1 generates answer

### Environment Variables

Required in `.env`:

```
OPENAI_API_KEY=...
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=...
```

### MCP Client Configuration

To connect from Windsurf or other MCP clients:

```json
{
  "mcpServers": {
    "agent": {
      "serverUrl": "http://localhost:8079/sse",
      "headers": {}
    }
  }
}
```

## Code Organization

- `/agent.ts` - MCP server implementation with tool definitions
- `/tools/` - Service abstractions (Neo4j, OpenAI)
- `/backlog/` - Alternative implementations and experimental features
- `/training_data/` - Sample training documents
- `/utils.ts` - Text processing utilities

## Key Technical Details

- **No TypeScript config**: Project uses `tsx` for direct TS execution
- **Module type**: ESM (`"type": "module"` in package.json)
- **Neo4j Queries**: Uses Cypher with `gds.similarity.cosine()` for vector search
- **Chunking Strategy**: Fixed 8000-char chunks (no overlap)
- **MCP Protocol**: SSE transport for streaming responses

## Important Notes

- The system expects a `main.md` file in the root for the system prompt
- Neo4j must have GDS (Graph Data Science) library installed for vector similarity
- Training data is chunked before embedding to stay within token limits
- The backlog directory contains alternative implementations using ChromaDB
