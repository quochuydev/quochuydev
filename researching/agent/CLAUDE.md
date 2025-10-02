# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered agent system that uses MCP (Model Context Protocol) to provide RAG (Retrieval-Augmented Generation) capabilities. The system stores domain knowledge in a vector database (Neo4j) and allows clients to query it via MCP tools.

## Development Commands

### Running the MCP Server

```sh
npm start
```

### Available Scripts

```sh
npm run agent
```

## Architecture

### Core Components

1. **MCP Server** (`agent.ts`):

   - Exposes two main tools via MCP protocol:
     - `search_knowledge_base`: Queries the knowledge base using RAG
     - `train_data`: Stores custom training data (chunked & embedded)
   - Uses SSE (Server-Sent Events) transport on `/sse` endpoint
   - Handles POST requests on `/messages` endpoint

## Code Organization

- `/agent.ts` - MCP server implementation with tool definitions
- `/tools/` - Service abstractions (Neo4j, OpenAI)
- `/backlog/` - Alternative implementations and experimental features
- `/training_data/` - Sample training documents
- `/utils.ts` - Text processing utilities

## Key Technical Details

- **No TypeScript config**: Project uses `tsx` for direct TS execution
- **Module type**: ESM (`"type": "module"` in package.json)
- **MCP Protocol**: SSE transport for streaming responses

## Important Notes

- The system expects a `main.md` file in the root for the system prompt
