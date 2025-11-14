# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and documentation repository for a fullstack JavaScript developer. Contains documentation site built with Vocs, research projects, AI prompts, and freelance workflow tools.

## Development Commands

### Documentation Site (Vocs)

```sh
# Development server
ENVIRONMENT=development vocs dev
npm run dev

# Build production site
npm run build
vocs build

# Preview production build
npm run preview
vocs preview

# Deploy to GitHub Pages
npm run release
```

### Research Projects

Most research projects are in `researching/` directory. Each has its own package.json:

```sh
# Better-t-app (Turbo monorepo)
cd researching/better-t-app
pnpm dev              # Run all workspaces
pnpm dev:web          # Run web app only
pnpm dev:native       # Run native app only
pnpm build
pnpm check-types
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations

# Agent (MCP server with Neo4j)
cd researching/agent
npm start             # Start MCP server
npm run agent

# Other projects
cd researching/<project-name>
# Check package.json for available scripts
```

## Architecture

### Documentation Site

- **Framework**: Vocs (documentation generator)
- **Config**: `vocs.config.ts` - sidebar navigation and site structure
- **Content**: `docs/pages/` - MDX files for portfolio pages
- **Daily Notes**: `docs/daily/` - daily writing in markdown
- **Build output**: `docs/dist/` - static site output

### Research Projects Structure

`researching/` contains multiple independent projects:

- **agent/** - MCP server with Neo4j for RAG capabilities
- **better-t-app/** - Turbo monorepo (Next.js + React Native)
- **claude-agent-sdk/** - Claude AI agent SDK experiments
- **llamaindex-ts/** - LlamaIndex TypeScript experiments
- **livekit-app/** - Video call application
- **paypal-stripe-payment/** - Payment integration examples
- **neo4j/** - Neo4j knowledge graph experiments
- **ag-ui-app/** - UI agent application
- **prompts/** - AI prompt templates and examples
- **guidelines/** - Development guidelines (general, FE, BE)
- **requirements/** - Job requirements analysis

### Custom Claude Commands

Located in `.claude/commands/`:

- **/brainstorming** - Interactive design refinement using Socratic method
  - Use before writing code to refine ideas
  - Asks questions one at a time
  - Proposes 2-3 approaches with trade-offs
  - Presents design in sections (200-300 words each)
  - Saves validated design to `docs/plans/YYYY-MM-DD-<topic>-design.md`

- **/write-plans** - Creates detailed implementation plans
  - Use after design is complete
  - Breaks tasks into bite-sized steps (2-5 minutes each)
  - TDD approach: write test → verify fail → implement → verify pass → commit
  - Saves to `docs/plans/YYYY-MM-DD-<feature-name>.md`

### Key Technical Patterns

**API Call Pattern:**
```ts
// Use fetch, not axios
const response = await fetch("/api/admin/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Product 1", price: 10 }),
});
const data = await response.json();
```

**Configuration Pattern:**
```ts
// Don't use direct process.env
// Use config abstraction
import { config } from "./config";
const response = await fetch(`${config.appUrl}/api/products`);
```

**Logging Pattern (Event Storming):**
```ts
// Commands
console.log("Command:CreateProduct", JSON.stringify({ title, price }));

// Events
console.log("Event:ProductCreated", JSON.stringify(productId));
```

**Error Handling:**
```ts
// Frontend (Client)
import { toast } from "sonner";
try {
  // ...
} catch (err) {
  const message = err instanceof Error ? err.message : `Failed to ${Command}`;
  toast(message);
}

// Backend (API Routes)
try {
  // ...
} catch (err) {
  return NextResponse.json(
    { error: err instanceof Error ? err.message : "Invalid request" },
    { status: 400 }
  );
}
```

**API Validation:**
- Use `zod` schema for all POST, PUT, PATCH requests
- Keep API routes simple (CRUD operations)
- Don't call API routes from other API routes - query database directly

**Code Style:**
- Use `camelCase` for variables
- Use `fetch` instead of `axios`
- Avoid `switch case` for different actions
- Review existing code before changes - only change necessary parts

### MCP Agent Architecture (researching/agent/)

**Core Components:**
- `agent.ts` - MCP server with SSE transport on `/sse` endpoint
- `tools/` - Service abstractions (Neo4j, OpenAI)
- `training_data/` - Sample training documents

**MCP Tools:**
- `search_knowledge_base` - Queries knowledge base using RAG
- `train_data` - Stores custom training data (chunked & embedded)

**Technical Details:**
- Uses `tsx` for direct TypeScript execution (no tsconfig)
- ESM module type
- SSE transport for streaming responses
- Expects `main.md` file in root for system prompt

## Git Workflow

- Main branch: `master`
- Use descriptive commit messages
- Common patterns seen in history: "daily writing", "RnD"
- Deployment to GitHub Pages via `gh-pages` npm package

## Important Notes

- **Ignored directories**: `node_modules/`, `dist/`, `ignore/`, `.env*`, `.DS_Store`
- **TypeScript**: Strict mode enabled, bundler module resolution
- **Package Manager**: Uses `pnpm` for some projects (better-t-app)
- **Freelance Workflow**: Check `docs/pages/freelance-prompt.md` for Upwork cover letter generation using /brainstorming command