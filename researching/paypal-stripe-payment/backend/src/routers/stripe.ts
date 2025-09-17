import Stripe from "stripe";
import { z } from "zod";
import { config } from "../config";
import { prisma } from "../db";
import { publicProcedure, router } from "../trpc";

const stripe = new Stripe(config.stripeSecretKey);

export const stripeRouter = router({
  createIntent: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Command:StripeCreateIntent", JSON.stringify(input));

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(input.amount * 100), // Convert to cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const result = { clientSecret: paymentIntent.client_secret };
      console.log("Event:StripeIntentCreated", JSON.stringify(result));

      return result;
    }),

  confirmPayment: publicProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Command:StripeConfirmPayment", JSON.stringify(input));

      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          type: "payin",
          amount: input.amount,
          provider: "Stripe",
          email: null,
        },
      });

      const result = { success: true, transactionId: transaction.id };
      console.log("Event:TransactionCreated", JSON.stringify(result));

      return result;
    }),
});
