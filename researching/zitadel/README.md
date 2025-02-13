Start zitadel container

```
docker build -t zitadel/zitadel:v2.60.0 -f ./Dockerfile.zitadel .

docker tag zitadel/zitadel:v2.60.0 zitadel/zitadel:latest

docker compose up
```

http://localhost:8080/ui/console

username: `zitadel-admin@zitadel.localhost`

initial password: `Password1!`

# Download the configuration files.

https://raw.githubusercontent.com/zitadel/zitadel/main/docs/docs/self-hosting/manage/reverseproxy/docker-compose.yaml -O docker-compose-base.yaml

https://raw.githubusercontent.com/zitadel/zitadel/main/docs/docs/self-hosting/manage/reverseproxy/nginx/docker-compose.yaml -O docker-compose-nginx.yaml

https://raw.githubusercontent.com/zitadel/zitadel/main/docs/docs/self-hosting/manage/reverseproxy/nginx/nginx-enabled-tls.conf -O nginx-enabled-tls.conf

openssl req -x509 -batch -subj "/CN=127.0.0.1.sslip.io/O=ZITADEL Demo" -nodes -newkey rsa:2048 -keyout ./selfsigned.key -out ./selfsigned.crt

docker compose --file docker-compose-base.yaml --file docker-compose-nginx.yaml up --detach proxy-enabled-tls

# Test that gRPC and HTTP APIs work. Empty brackets like {} means success.

sleep 3
grpcurl --insecure 127.0.0.1.sslip.io:443 zitadel.admin.v1.AdminService/Healthz
curl --insecure https://127.0.0.1.sslip.io:443/admin/v1/healthz
