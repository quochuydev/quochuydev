## Account

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

```
node-sqlite-payapp/
├─ backend/
│ ├─ package.json
│ ├─ tsconfig.json
│ ├─ .env.example
│ ├─ prisma/
│ │ └─ schema.prisma
│ └─ src/
│ ├─ server.ts
│ ├─ db.ts
│ ├─ trpc.ts
│ ├─ routes/
│ │ ├─ transactions.ts
│ │ ├─ payin.ts
│ │ └─ payout.ts
│ └─ utils.ts
├─ frontend/
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ src/
│ ├─ main.tsx
│ ├─ App.tsx
│ ├─ components/
│ │ ├─ PayIn.tsx
│ │ ├─ PayOut.tsx
│ │ └─ TransactionList.tsx
│ └─ config.ts
└─ README.md
```

## Role

You are to generate a Node.js + SQLite web application based on the following Mermaid specifications.

## Technical requirements:

- `vite`
- `@trpc/client`
- `@trpc/server`
- `express`
- `dotenv`
- `prisma`
- `zod`
- `tsx` for typescript
- `@stripe/react-stripe-js @stripe/stripe-js`
- Use trpc for query API
- DO NOT use `axios`

1. Backend:

   - Node.js with Express.
   - SQLite database.
   - Each successful call inserts into Transaction table.

2. Frontend:

   - Vite: `npm create vite@latest` - `react-ts`
   - Layout: PayIn (top-left), PayOut (bottom-left), TransactionList (right).
   - PayIn: Two buttons ("Pay with PayPal", "Pay with Stripe").
   - PayOut: Email input, Amount input, "Payout with PayPal" button.
   - TransactionList: Renders all transactions from /transactions endpoint.

3. Follow contracts from diagrams strictly. Do not invent extra fields, states, or APIs.

4. Use design tokens (optional) if styling is needed, otherwise keep simple layout.

## Layout Hierarchy

```mermaid
flowchart TD
  App --> PayIn
  App --> PayOut
  App --> TransactionList

  PayIn["PayIn (Top-Left): PayPal + Stripe Button"]
  PayOut["PayOut (Bottom-Left): Email Input + Amount Input + PayPal Button"]
  TransactionList["TransactionList (Right Panel)"]
```

## Component Contracts

```mermaid
classDiagram
  class PayIn {
    +payWithPayPal()
    +payWithStripe()
  }

  class PayOut {
    +string email
    +float amount
    +submitPayout()
  }

  class TransactionList {
    +Transaction[] transactions
    +render()
  }

  class Transaction {
    +int id
    +string type  // "payin" or "payout"
    +float amount
    +string provider  // PayPal or Stripe
    +string email
    +datetime createdAt
  }

  PayIn --> Transaction : creates
  PayOut --> Transaction : creates
  TransactionList --> Transaction : displays
```

## Interaction Flow

```mermaid
stateDiagram
  [*] --> Start

  Start --> PayInProcessing : clickPayIn

  state PayInProcessing {
    [*] --> StripeCreateIntent : provider=stripe
    StripeCreateIntent --> StripeConfirmPayment
    StripeConfirmPayment --> CreateTransaction

    [*] --> PaypalCreateOrder : provider=paypal
    PaypalCreateOrder --> PaypalConfirmPayment
    PaypalConfirmPayment --> CreateTransaction
  }

  Start --> PayOutProcessing : clickPayOut
  PayOutProcessing --> PaypalRequestPayOut
  PaypalRequestPayOut --> CreateTransaction

  CreateTransaction --> End
  PaypalRequestPayOut --> Failed
  PaypalConfirmPayment --> Failed
```

## Pay-in sequence diagram

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Frontend (React)
  participant BE as Backend (Express API)
  participant P as PayPal API
  participant S as Stripe API
  participant DB as SQLite DB

  %% Stripe Pay-In
  U->>FE: Click "Pay with Stripe"
  FE->>BE: call api stripeCreateIntent
  BE->>S: Create PaymentIntent
  S-->>BE: client_secret
  BE-->>FE: client_secret
  FE->>S: Confirm Payment with Stripe.js
  S-->>FE: Payment Success
  FE->>BE: call api transactions
  BE->>DB: Insert Transaction row
  DB-->>BE: ok
  BE-->>FE: { success: true }

  Note over U,DB: Stripe flow = frontend & Stripe.js handle confirmation, backend records transaction.

  %% PayPal Pay-In
  U->>FE: Click "Pay with PayPal"
  FE->>BE: call api paypalCreateOrder
  BE->>P: Create Order
  P-->>BE: orderID
  BE-->>FE: orderID
  FE->>P: PayPal popup / approve UI
  U->>P: Authorizes payment in PayPal UI
  P-->>FE: Order approved
  FE->>BE: call api paypalCaptureOrder
  BE->>P: Capture Order
  P-->>BE: Capture success
  BE->>DB: Insert Transaction row
  DB-->>BE: ok
  BE-->>FE: { success: true }

  %% PayPal Pay-Out
  U->>FE: Enter email + amount, click "Payout with PayPal"
  FE->>BE: call api paypalPayout
  BE->>P: Create Payout (Payouts API)
  P-->>BE: Payout success
  BE->>DB: Insert Transaction row
  DB-->>BE: ok
  BE-->>FE: { success: true }
```

## Database Schema

```mermaid
erDiagram
  Transaction {
    int id PK
    string type
    float amount
    string provider
    string email
    datetime createdAt
  }
```

## Documentation

- This just example code, copied from official document
- Don't use exact example, recommended to follow coding guidelines

### `@stripe/react-stripe-js` example code

```tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch("/stripe/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "/",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe("$STRIPE_PUBLIC_KEY");

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const App = () => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>
);

ReactDOM.render(<App />, document.body);
```

### Stripe - create-intent

```sh
curl https://api.stripe.com/v1/payment_intents \
  -u "$STRIPE_SECRET_KEY" \
  -d amount=2000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]"=true
```

```sh
curl -v -X POST https://api-m.sandbox.paypal.com/v1/payments/payouts \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer $PAYPAL_ACCESS_TOKEN' \
-d '{
  "sender_batch_header": {
    "sender_batch_id": "Payouts_2018_100007",
    "email_subject": "You have a payout!",
    "email_message": "You have received a payout! Thanks for using our service!"
  },
  "items": [
    {
      "recipient_type": "EMAIL",
      "amount": {
        "value": "9.87",
        "currency": "USD"
      },
      "note": "Thanks for your patronage!",
      "sender_item_id": "201403140001",
      "receiver": "receiver@example.com",
      "alternate_notification_method": {
        "phone": {
          "country_code": "91",
          "national_number": "9999988888"
        }
      },
      "notification_language": "fr-FR"
    },
    {
      "recipient_type": "PHONE",
      "amount": {
        "value": "112.34",
        "currency": "USD"
      },
      "note": "Thanks for your support!",
      "sender_item_id": "201403140002",
      "receiver": "91-734-234-1234"
    },
    {
      "recipient_type": "PAYPAL_ID",
      "amount": {
        "value": "5.32",
        "currency": "USD"
      },
      "note": "Thanks for your patronage!",
      "sender_item_id": "201403140003",
      "receiver": "G83JXTJ5EHCQ2",
      "purpose": "GOODS"
    }
  ]
}'
```

### Paypal - UI

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PayPal JS SDK Standard Integration</title>
  </head>
  <body>
    <div id="paypal-button-container"></div>
    <p id="result-message"></p>

    <!-- Initialize the JS-SDK -->
    <script
      src="https://www.paypal.com/sdk/js?client-id=test&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card"
      data-sdk-integration-source="developer-studio"
    ></script>
    <script src="app.js"></script>
  </body>
</html>
```

### Paypal - FE

```ts
const paypalButtons = window.paypal.Buttons({
  style: {
    shape: "rect",
    layout: "vertical",
    color: "gold",
    label: "paypal",
  },
  message: {
    amount: 100,
  },
  async createOrder() {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              id: "YOUR_PRODUCT_ID",
              quantity: "YOUR_PRODUCT_QUANTITY",
            },
          ],
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      }
      const errorDetail = orderData?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        : JSON.stringify(orderData);

      throw new Error(errorMessage);
    } catch (error) {
      console.error(error);
      // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
    }
  },
  async onApprove(data, actions) {
    try {
      const response = await fetch(`/api/orders/${data.orderID}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per
        // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        resultMessage(
          `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      resultMessage(
        `Sorry, your transaction could not be processed...<br><br>${error}`
      );
    }
  },
});
paypalButtons.render("#paypal-button-container");

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}
```

### Paypal - BE

```ts
import express from "express";
import "dotenv/config";
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
  PaypalExperienceLandingPage,
  PaypalExperienceUserAction,
  ShippingPreference,
} from "@paypal/paypal-server-sdk";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8080 } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: "100",
            breakdown: {
              itemTotal: {
                currencyCode: "USD",
                value: "100",
              },
            },
          },
          // lookup item details in `cart` from database
          items: [
            {
              name: "T-Shirt",
              unitAmount: {
                currencyCode: "USD",
                value: "100",
              },
              quantity: "1",
              description: "Super Fresh Shirt",
              sku: "sku01",
            },
          ],
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.createOrder(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

// createOrder route
app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.captureOrder(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

// captureOrder route
app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});
```

### TRPC Client

```ts
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { tap } from "@trpc/server/observable";
import type { AppRouter } from "./server";

async function main() {
  const url = `http://localhost:2021/trpc`;

  const trpc = createTRPCClient<AppRouter>({
    links: [
      () =>
        ({ op, next }) => {
          console.log("->", op.type, op.path, op.input);

          return next(op).pipe(
            tap({
              next(result) {
                console.log("<-", op.type, op.path, op.input, ":", result);
              },
            })
          );
        },
      httpBatchLink({ url }),
    ],
  });

  // parallel queries
  await Promise.all([
    //
    trpc.hello.query(),
    trpc.hello.query("client"),
  ]);

  const postCreate = await trpc.post.createPost.mutate({
    title: "hello client",
  });
  console.log("created post", postCreate.title);

  const postList = await trpc.post.listPosts.query();
  console.log("has posts", postList, "first:", postList[0].title);

  try {
    await trpc.admin.secret.query();
  } catch (cause) {
    // will fail
  }

  const authedClient = createTRPCClient<AppRouter>({
    links: [
      loggerLink(),
      httpBatchLink({
        url,
        headers: () => ({
          authorization: "secret",
        }),
      }),
    ],
  });

  await authedClient.admin.secret.query();

  const msgs = await trpc.message.listMessages.query();
  console.log("msgs", msgs);

  console.log("👌 should be a clean exit if everything is working right");
}

void main();
```

### TRPC Server

```ts
import { EventEmitter } from "events";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== "secret") {
      return null;
    }
    return {
      name: "alex",
    };
  };

  return {
    req,
    res,
    user: getUser(),
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

// --------- create procedures etc

let id = 0;

const ee = new EventEmitter();
const db = {
  posts: [
    {
      id: ++id,
      title: "hello",
    },
  ],
  messages: [createMessage("initial message")],
};
function createMessage(text: string) {
  const msg = {
    id: ++id,
    text,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  ee.emit("newMessage", msg);
  return msg;
}

const postRouter = router({
  createPost: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        id: ++id,
        ...input,
      };
      db.posts.push(post);
      return post;
    }),
  listPosts: publicProcedure.query(() => db.posts),
});

const messageRouter = router({
  addMessage: publicProcedure.input(z.string()).mutation(({ input }) => {
    const msg = createMessage(input);
    db.messages.push(msg);

    return msg;
  }),
  listMessages: publicProcedure.query(() => db.messages),
});

// root router to call
const appRouter = router({
  // merge predefined routers
  post: postRouter,
  message: messageRouter,
  // or individual procedures
  hello: publicProcedure.input(z.string().nullish()).query((opts) => {
    return `hello ${opts.input ?? opts.ctx.user?.name ?? "world"}`;
  }),
  // or inline a router
  admin: router({
    secret: publicProcedure.query((opts) => {
      if (!opts.ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      if (opts.ctx.user?.name !== "alex") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return {
        secret: "sauce",
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;

async function main() {
  // express implementation
  const app = express();

  app.use((req, _res, next) => {
    // request logger
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.get("/", (_req, res) => {
    res.send("hello");
  });
  app.listen(2021, () => {
    console.log("listening on port 2021");
  });
}

void main();
```

### env

```
APP_URL=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
```

## Coding guidelines

- Use `camelCase` for variable names
- Don't expect use `switch case` to handle different actions
- Don't use direct `process.env.` and hard code URL

```ts
// BAD
const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : `http://localhost:${process.env.PORT || 3000}`;

const response = await fetch(`${baseUrl}/api/admin/products/${productId}`);
const data = await response.json();

// GOOD
import { config } from "./config";

const response = await fetch(
  `${config.appUrl}/api/admin/products/${productId}`
);
const data = await response.json();
```

- Logging: Using `console.log` must be matching with a command/event in diagram

```ts
console.log("Command:CreateProduct", JSON.stringify(params));

console.log("Event:ProductCreated", JSON.stringify(result));
```
