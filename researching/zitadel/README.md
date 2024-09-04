Start zitadel container

```
docker build -t zitadel/zitadel:v2.60.0 -f ./Dockerfile.zitadel .

docker tag zitadel/zitadel:v2.60.0 zitadel/zitadel:latest
```

http://localhost:8080/ui/console

username: `zitadel-admin@zitadel.localhost`

password: `Password1!`
