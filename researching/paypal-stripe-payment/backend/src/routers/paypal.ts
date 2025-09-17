import {
  ApiError,
  Client,
  Environment,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { z } from "zod";
import { config } from "../config";
import { prisma } from "../db";
import { publicProcedure, router } from "../trpc";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: config.paypalClientId,
    oAuthClientSecret: config.paypalSecret,
  },
  timeout: 0,
  environment: Environment.Sandbox,
});

const ordersController = new OrdersController(client);

export const paypalRouter = router({
  createOrder: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Command:PaypalCreateOrder", JSON.stringify(input));

      const collect = {
        body: {
          intent: "CAPTURE" as const,
          purchaseUnits: [
            {
              amount: {
                currencyCode: "USD",
                value: input.amount.toString(),
              },
            },
          ],
        },
        prefer: "return=minimal",
      };

      try {
        const { body, ...httpResponse } = await ordersController.createOrder(
          collect
        );
        const orderData = JSON.parse(body);

        const result = { orderID: orderData.id };
        console.log("Event:PaypalOrderCreated", JSON.stringify(result));

        return result;
      } catch (error) {
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw error;
      }
    }),

  captureOrder: publicProcedure
    .input(
      z.object({
        orderID: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Command:PaypalCaptureOrder", JSON.stringify(input));

      const collect = {
        id: input.orderID,
        prefer: "return=minimal",
      };

      try {
        const { body } = await ordersController.captureOrder(collect);
        const orderData = JSON.parse(body);

        // Create transaction record
        const transaction = await prisma.transaction.create({
          data: {
            type: "payin",
            amount: input.amount,
            provider: "PayPal",
            email: null,
          },
        });

        const result = {
          success: true,
          transactionId: transaction.id,
          captureData: orderData,
        };
        console.log("Event:TransactionCreated", JSON.stringify(result));

        return result;
      } catch (error) {
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw error;
      }
    }),

  payout: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        amount: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Command:PaypalPayout", JSON.stringify(input));

      // For demo purposes, simulate payout success
      // In real implementation, use PayPal Payouts API

      const transaction = await prisma.transaction.create({
        data: {
          type: "payout",
          amount: input.amount,
          provider: "PayPal",
          email: input.email,
        },
      });

      const result = { success: true, transactionId: transaction.id };
      console.log("Event:TransactionCreated", JSON.stringify(result));

      return result;
    }),
});
