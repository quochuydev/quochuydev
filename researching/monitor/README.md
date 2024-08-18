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

### Ref

https://bit.kevinslin.com/p/logging-with-opentelemetry-and-loki

https://medium.com/@magstherdev/grafana-alloy-opentelemetry-59c171d2ebfc

https://github.com/grafana/intro-to-mltp/blob/main/docker-compose.yml

https://github.com/grafana/intro-to-mltp/blob/main/alloy/config.alloy

https://github.com/grafana/alloy/blob/main/example/config/alloy/config.alloy

https://community.grafana.com/t/nodejs-logging-using-winston/76990/13
