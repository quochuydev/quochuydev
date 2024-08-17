### Optional

```bash
cd Projects/my_github/quochuydev/researching/monitor/
```

### Setup

```bash
# install plugin to allow applications to ship their logs to Loki
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

### Run

```bash
docker compose up -d

# open http://localhost:3000

docker compose down
```
