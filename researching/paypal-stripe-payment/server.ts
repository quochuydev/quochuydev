import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { z } from "zod";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

if (process.env.ENV_PATH) {
  const envPath = path.join(process.cwd(), process.env.ENV_PATH);
  const buffer = fs.readFileSync(envPath);
  const defaultConfig = dotenv.parse(buffer);

  Object.entries(defaultConfig).forEach(([key, value]) => {
    if (!process.env[key]) process.env[key] = value;
  });
}

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

const db = {
  posts: [
    {
      title: "hello",
    },
  ],
};

const postRouter = router({
  createPost: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        ...input,
      };
      db.posts.push(post);
      return post;
    }),
  listPosts: publicProcedure.query(() => db.posts),
});

const paypalRouter = router({
  checkout: t.procedure
    .input(z.object({ payee: z.string() }))
    .mutation(async ({ input }) => {
      const { payee } = input;

      const searchParams = new URLSearchParams();
      searchParams.append("grant_type", "client_credentials");

      const tokenResult = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${process.env.CREDENTIAL}`,
          },
          body: searchParams,
        }
      ).then((res) => res.json());

      console.log("tokenResult", tokenResult);

      const result = await fetch(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResult.access_token}`,
          },
          body: JSON.stringify({
            intent: "CAPTURE",
            payer: {
              email_address: payee,
            },
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: "3",
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
              return_url: "http://localhost:2022/payment-return",
              cancel_url: "http://localhost:2022/payment-cancel",
            },
          }),
        }
      ).then((res) => res.json());

      console.log("result", result);

      return {};
    }),
});

const appRouter = router({
  post: postRouter,
  paypal: paypalRouter,
  admin: router({
    secret: publicProcedure.query(({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      if (ctx.user?.name !== "alex") {
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
  const app = express();

  app.use((_req, _res, next) => {
    // console.log(req.method, req.path, req.body ?? req.query);
    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.get("/", (_, res) => res.send("app is running"));

  app.post("/paypal/webhook", async (req, res) => {
    try {
      //
    } catch (error) {
      console.error(error);
    }
    res.status(200).send("ok");
  });

  app.get("/payment-return", async (req, res) => {
    const token = req.query.token;
    const PayerID = req.query.PayerID;

    const searchParams = new URLSearchParams();
    searchParams.append("grant_type", "client_credentials");

    const tokenResult = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${process.env.CREDENTIAL}`,
        },
        body: searchParams,
      }
    ).then((res) => res.json());

    console.log("tokenResult", tokenResult);

    const result = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResult.access_token}`,
        },
        body: JSON.stringify({}),
      }
    ).then((res) => res.json());

    console.log("result", result);

    res.json({ token, PayerID, result });
  });

  app.listen(2022, () => {
    console.log("listening on port 2022");
  });
}

void main();
