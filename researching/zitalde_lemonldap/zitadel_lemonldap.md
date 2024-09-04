docs:

https://lemonldap-ng.org/documentation/2.0/docker.html

https://lemonldap-ng.org/documentation/latest/authopenidconnect.html

https://lemonldap-ng.org/documentation/3.0/openidconnectservice.html

https://lemonldap-ng.org/documentation/2.0/authdemo.html

https://lemonldap-ng.org/documentation/latest/webserviceprotection.html

start lemonldap container:

```
echo "127.0.0.1 auth.example.com manager.example.com test1.example.com test2.example.com" | sudo tee -a /etc/hosts
docker run -d --name lemonldap -p 80:80 --network zitadel coudot/lemonldap-ng
```

login to: http://manager.example.com

account: dwho/dwho

1. General Parameters > Issuer modules > OpenID Connect

2. OpenID Connect Service > Security > Keys > Signature keys

3. OpenID Connect Relying Parties > rp-example > Basic

http://portal.local:3030/idps/callback

client_secret_post

4. docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' lemonldap

5. docker exec -i zitadel sh -c "echo '172.19.0.5 auth.example.com' >> /etc/hosts"
