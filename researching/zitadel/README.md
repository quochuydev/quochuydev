Start zitadel container

```
docker build -t zitadel/zitadel:v2.60.0 -f ./Dockerfile.zitadel .

docker tag zitadel/zitadel:v2.60.0 zitadel/zitadel:latest

docker compose up
```

http://localhost:8080/ui/console

username: `zitadel-admin@zitadel.localhost`

initial password: `Password1!`
