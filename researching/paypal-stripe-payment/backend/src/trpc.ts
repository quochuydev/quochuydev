import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import { createTransaction, listTransactions } from "./db.js";
import { paypalRouter } from "./routers/paypal";
import { stripeRouter } from "./routers/stripe";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

type Context = ReturnType<typeof createContext> extends Promise<infer U>
  ? U
  : ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

const transactionsRouter = router({
  list: publicProcedure.query(async () => {
    const txs = await listTransactions();
    return txs;
  }),
  stripePayIn: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const tx = await createTransaction({
        type: "payin",
        amount: input.amount,
        provider: "Stripe",
        email: input.email,
      });
      return tx;
    }),
  paypalPayIn: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const tx = await createTransaction({
        type: "payin",
        amount: input.amount,
        provider: "PayPal",
        email: input.email,
      });
      return tx;
    }),
  paypalPayout: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const tx = await createTransaction({
        type: "payout",
        amount: input.amount,
        provider: "PayPal",
        email: input.email,
      });
      return tx;
    }),
});

export const appRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query((opts) => {
    return `hello ${opts.input ?? "world"}`;
  }),
  transactions: transactionsRouter,
  stripe: stripeRouter,
  paypal: paypalRouter,
});

export type AppRouter = typeof appRouter;
export { createContext };
