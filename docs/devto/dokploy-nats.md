# Repo

https://github.com/quochuydev/dokploy-nats

# Title

How I Self-Hosted a Production-Ready NATS Server on Dokploy in 5 Minutes

# Tags

nats, devops, docker, selfhosted, opensource

# Body

I wanted a message broker for a side project without paying for managed Kafka or wrestling with RabbitMQ clustering. NATS was the obvious answer—until I tried wiring up JetStream, token auth, WebSocket for the browser, and Traefik routing on my own. So I packaged the whole thing as a Dokploy Compose template.

## The Problem

Spinning up NATS sounds easy until you actually need it in production:

- The default `nats:alpine` image gives you a server but no persistence, no auth, no WebSocket
- `nats.conf` syntax is fine, but plumbing env vars through Docker Compose takes trial and error
- Browser clients need the WebSocket port exposed through a reverse proxy with TLS
- The monitoring endpoint on port 8222 is wide open by default
- Every tutorial stops at "it runs locally"—nothing covers a real self-hosted deploy

## The Solution: dokploy-nats

A single Git repo you point Dokploy at. It gives you NATS 2.10 with JetStream, token auth, WebSocket, and a monitoring endpoint—all driven by environment variables, all routed through Traefik.

```yaml
services:
  nats:
    image: nats:2.10.24-alpine
    command: ["-c", "/etc/nats/nats.conf"]
    volumes: [./nats.conf:/etc/nats/nats.conf:ro, nats-data:/data]
```

That's the core. Everything else is environment variables you set in the Dokploy UI.

## How It Works

1. **Dokploy clones the repo** and runs `docker-compose up` with your env vars injected
2. **`nats.conf` interpolates env vars** at startup—server name, auth token, JetStream limits, ports
3. **Traefik labels route traffic** to `nats-monitor.yourdomain` (HTTP dashboard) and `nats-ws.yourdomain` (WebSocket)
4. **A named volume persists JetStream data** so streams survive container restarts

No bash scripts, no manual `nats-server` flags, no hand-rolled Compose files.

## Get Started in 5 Minutes

```bash
git clone https://github.com/quochuydev/dokploy-nats
# Then in Dokploy: New Service → Compose → point at this repo
```

You configure:

- **`NATS_AUTH_TOKEN`** — generate with `openssl rand -base64 32`
- **`NATS_JS_MAX_FILE`** — how much disk JetStream can use (e.g. `10G`)
- **`NATS_WS_PORT`** — WebSocket port behind Traefik (e.g. `8080`)
- **Traefik domains** — `nats-monitor.example.com` and `nats-ws.example.com`

## What You Get

| Feature           | Port | Purpose                                    |
| ----------------- | ---- | ------------------------------------------ |
| Native TCP        | 4222 | Standard NATS clients (Go, Node, Python)   |
| HTTP monitoring   | 8222 | Health checks, connection stats, JetStream |
| WebSocket         | 8080 | Browser clients, mobile apps               |
| JetStream storage | —    | Persistent streams, KV, object store       |

## Connecting from a Client

The repo includes a working Node.js example with Fastify + a worker using NATS request/reply over JetStream:

```bash
nats context save dokploy \
  --server wss://nats-ws.yourdomain.com \
  --token "$NATS_AUTH_TOKEN"
nats sub demo  # in one terminal
nats pub demo "hello"  # in another
```

The `examples/node/` folder demonstrates the request/reply pattern between an HTTP API and background workers, streaming execution events back to the browser over WebSocket.

## Why This Works

1. **Env vars, not hardcoded config** — same image, same compose file, different deployments
2. **Traefik labels included** — TLS and routing handled by Dokploy's built-in proxy
3. **JetStream out of the box** — durable streams, KV store, no extra setup
4. **Healthcheck baked in** — `wget /healthz` so Dokploy knows when to restart it
5. **WebSocket native** — browser clients work without an extra bridge

## Try It

If you've been putting off self-hosting NATS because the deployment side felt fiddly, this should unblock you:

```bash
git clone https://github.com/quochuydev/dokploy-nats
```

First thing to try: deploy it, point the Node.js example in `examples/node/` at your new server, and watch real-time job events stream into your browser over WebSocket.

---

> **GitHub**: [github.com/quochuydev/dokploy-nats](https://github.com/quochuydev/dokploy-nats)

---

What's your go-to message broker for side projects—NATS, Redis Pub/Sub, or something heavier? I'd love to hear what's working for you.

# Image capture for blog

| Image              | Where in Post                | What to Capture                                                          |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------ |
| Dokploy deploy UI  | After "Get Started"          | The Dokploy Compose service screen with the repo URL and env vars filled |
| Monitoring dash    | After "What You Get" table   | Screenshot of `nats-monitor` dashboard showing connections and JetStream |
| Terminal demo      | After "Connecting"           | `nats sub` and `nats pub` running in split terminals showing the message |
| Node example       | After "Connecting"           | Browser view of `examples/node` streaming job execution events live      |

# Banana AI banner prompt

Minimalist tech illustration of a central glowing NATS server node radiating message streams outward to a browser, a Node.js worker, and a database icon. Persistent stream lines suggested by stacked horizontal bars flowing between nodes. Dark navy background with electric green and cyan accents (NATS brand colors). Subtle Docker whale silhouette and Traefik mesh pattern in the background. Modern infrastructure-as-code aesthetic, clean flat design, no text.
