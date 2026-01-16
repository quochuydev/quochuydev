# Repo

https://github.com/quochuydev/nats-flow-gateway

# Title

How I Built a Traceable API Gateway with NATS and Chain of Thought Flows

# Tags

typescript, nats, api, microservices, opensource

# Body

Ever debugged a production issue where a request passed through 5 services and you had no idea what went wrong where? I got tired of logging everything manually and losing context across async boundaries, so I built an API gateway that traces every operation automatically.

## The Problem

In distributed systems:

- Requests bounce between services, logs scatter everywhere
- Business logic gets buried in boilerplate
- Validation happens inconsistently across endpoints
- When things fail, you're grep-ing through logs hoping to find the chain
- Adding tracing to existing code means refactoring everything

## The Solution: Flow-Based Architecture

What if every API operation was a traceable flow with built-in validation?

```
Client → Fastify → NATS Request → Flow → NATS Reply → Response
```

Each flow has automatic tracing. You see exactly what happened, step by step.

## How It Works

1. **Define a Flow** - Wrap your business logic in a flow function with input/trace/ok callbacks
2. **NATS Handles Messaging** - Flows communicate via NATS subjects, decoupling services
3. **Built-in Tracing** - Every flow step is logged with context, no manual instrumentation
4. **Schema Validation** - Inputs are validated before your code runs

No scattered console.logs. No lost context. Every operation is auditable.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/nats-flow-gateway.git
cd nats-flow-gateway
docker compose -f docker-compose.dev.yaml up -d
cd server && npm install
npm run db:generate && npm run db:migrate && npm run seed
npm run dev
```

This gives you:

- Fastify server with NATS integration
- PostgreSQL database with Drizzle ORM
- Health check, auth, and admin flows ready to extend
- Docker infrastructure for local development

## Project Structure

| Directory | Purpose |
| --------- | ------- |
| `flows/` | Business logic organized by domain (auth, admin, customer) |
| `middleware/` | Request/response processing |
| `resources/` | API endpoint handlers |
| `schemas/` | Input validation definitions |
| `types/` | TypeScript type safety |

## API Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/api/v1/healthcheck` | GET | Service health verification |
| `/api/v1/admin/login` | POST | Authentication with email/password |
| `/api/v1/admin/list` | GET | Admin operations (requires bearer token) |

## Why This Works

1. **Chain of Thought Tracing** - Every flow logs its reasoning, making debugging trivial
2. **NATS Decoupling** - Services communicate without tight coupling, scale independently
3. **Validation at the Edge** - Bad data never reaches your business logic
4. **TypeScript Throughout** - Full type safety from request to response

## Try It

If you're building microservices and want built-in traceability:

```bash
git clone https://github.com/quochuydev/nats-flow-gateway.git
```

Spin it up, hit the health check endpoint, and check the logs—you'll see the flow trace immediately.

---

> **GitHub**: [quochuydev/nats-flow-gateway](https://github.com/quochuydev/nats-flow-gateway)

---

How do you handle tracing in your distributed systems? I'd love to hear what patterns have worked for you.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Architecture diagram | After "The Solution" | The request flow diagram (Client → Fastify → NATS → Flow → Response) as a Mermaid diagram |
| Flow code example | After "How It Works" | Screenshot of a flow file showing the input/trace/ok pattern |
| Folder structure | After "Project Structure" | VS Code sidebar showing the server/src directory with flows/, middleware/, resources/, schemas/ |
| Terminal output | After "Try It" | Terminal showing the server starting and a curl request to healthcheck with trace logs |

# Banana AI banner prompt

Modern technical illustration showing a request flowing through connected nodes: a glowing API gateway on the left, connected via flowing lines to a NATS messaging icon (stylized N), then to multiple smaller flow nodes arranged in a chain pattern. Each node has a subtle trace/log indicator. Clean minimalist style with dark background, cyan and orange accent colors representing data flow. Abstract circuit board patterns in background. No text, developer tools aesthetic.
