# Repo

https://github.com/quochuydev/dokploy-grafana-compose

# Title

How I Built a One-Command Observability Stack for Dokploy

# Tags

devops, monitoring, grafana, docker, opensource

# Body

Ever deployed an app to production and then realized you have zero visibility into what's happening? No logs, no traces, no idea why users are complaining. I got tired of stitching together monitoring tools from scratch every time, so I built a complete observability stack that just works with Dokploy.

## The Problem

Setting up proper observability is painful:

- Grafana, Tempo, Loki, and collectors each need separate configuration
- Getting them to talk to each other requires networking magic
- OpenTelemetry setup has a steep learning curve
- Most tutorials assume you have infinite time to debug YAML
- Dokploy's Docker network adds another layer of complexity

## The Solution: Dokploy Grafana Compose

A pre-configured monitoring stack that deploys alongside your Dokploy apps. Four services, one `docker-compose up`, done.

```yaml
# All four services on dokploy-network, pre-wired
services:
  alloy:    # Collects traces, logs, metrics
  tempo:    # Stores traces
  loki:     # Stores logs
  grafana:  # Visualizes everything
```

Your apps send telemetry to Alloy, and everything flows to the right place automatically.

## How It Works

1. **Alloy receives data** - OTLP receiver on port 4317/4318 accepts traces, logs, and metrics from your apps
2. **Data routes automatically** - Traces go to Tempo, logs go to Loki, metrics go to Prometheus
3. **Grafana correlates everything** - See a slow request? Jump from trace to related logs instantly
4. **Faro captures frontend** - Browser-side Real User Monitoring included on port 12347

No configuration files to edit. Just deploy and instrument your apps.

## Get Started in 30 Seconds

```bash
git clone https://github.com/quochuydev/dokploy-grafana-compose.git
cd dokploy-grafana-compose
docker compose up -d
```

This deploys:

- **Grafana Alloy v1.11.3** - Unified telemetry collector with OTLP and Faro receivers
- **Tempo v2.9.0** - Distributed tracing backend
- **Loki v3.5.8** - Log aggregation system
- **Grafana v12.2.1** - Pre-provisioned dashboards for traces and logs

## Stack Components

| Service | Purpose | What It Does |
| ------- | ------- | ------------ |
| Alloy | Data Collection | Receives OTLP (4317/4318) and Faro (12347) telemetry |
| Tempo | Trace Storage | Stores distributed traces, enables TraceQL queries |
| Loki | Log Storage | Aggregates logs, enables LogQL queries |
| Grafana | Visualization | Correlates traces + logs + metrics in one UI |

## Instrumenting Your App

The repo includes a Node.js example. Key dependencies:

```bash
pnpm add @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-trace-otlp-http @opentelemetry/exporter-logs-otlp-http
```

Then initialize the SDK pointing to Alloy:

```typescript
const traceExporter = new OTLPTraceExporter({ url: 'http://alloy:4318/v1/traces' });
const logExporter = new OTLPLogExporter({ url: 'http://alloy:4318/v1/logs' });
```

Run the example: `(cd examples/node && pnpm start)`

## Why This Works

1. **Zero configuration** - All services pre-wired on `dokploy-network`, just deploy
2. **Production versions** - Uses stable releases of Grafana ecosystem tools
3. **Auto-restart** - All containers use `unless-stopped` restart policy
4. **Standard protocols** - OTLP means any OpenTelemetry-compatible app works
5. **Frontend monitoring included** - Faro receiver captures browser telemetry out of the box

## Try It

If you're running Dokploy and want observability without the setup headache:

```bash
git clone https://github.com/quochuydev/dokploy-grafana-compose.git
cd dokploy-grafana-compose
docker compose up -d
```

Open Grafana at `http://localhost:3000` and run the Node.js example to see traces flowing in.

---

> **GitHub**: [quochuydev/dokploy-grafana-compose](https://github.com/quochuydev/dokploy-grafana-compose)
>
> **Docs**: [Grafana](https://grafana.com/docs/) | [OpenTelemetry](https://opentelemetry.io/docs/) | [Dokploy](https://dokploy.com/)

---

How do you handle observability in your Dokploy deployments? Would love to hear what stacks others are using.

# Image capture for blog

| Image | Where in Post | What to Capture |
| ----- | ------------- | --------------- |
| Grafana trace view | After "How It Works" | Screenshot of Grafana showing a trace with spans (docs/tracing.png) |
| Tempo trace explorer | After "Stack Components" | TraceQL query results in Grafana (docs/tempo.png) |
| Alloy data flow | After "Instrumenting Your App" | Grafana Alloy dashboard showing data ingestion (docs/dokploy-alloy.png) |
| Metrics dashboard | After "Why This Works" | Dokploy metrics visualization (docs/dokploy-metrics.png) |

# Banana AI banner prompt

Modern tech illustration showing interconnected observability stack: a central node labeled with abstract telemetry symbols (wavy lines for traces, stacked bars for logs, zigzag for metrics) with four orbiting circles representing Grafana, Tempo, Loki, and Alloy. Clean geometric style, dark purple to teal gradient background, glowing connection lines between components. Developer tool aesthetic with subtle Docker container shapes in background. No text, minimalist flat design.
