```
lsof -ti :2022 | grep -q . && kill -9 $(lsof -ti :2022)

ngrok http 2022

curl -X POST http://localhost:2022/api/payments/_create -H "Content-Type: application/json" -d '{"q":"name"}'

https://developer.paypal.com/dashboard/accounts
https://sandbox.paypal.com

Type: Business
sb-j8euh32540685@business.example.com

Type: Personal
sb-fdu9n32561246@personal.example.com

Type: Personal
sb-ltksd32561458@personal.example.com

https://developer.paypal.com/dashboard/applications/sandbox

App name: myapp-merchant
Email: sb-j8euh32540685@business.example.com
Client ID: *
Secret key 1: *
```
