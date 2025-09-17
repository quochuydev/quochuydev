import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TransactionCreateInput = {
  type: "payin" | "payout";
  amount: number;
  provider: "PayPal" | "Stripe" | string;
  email?: string;
};

export async function createTransaction(input: TransactionCreateInput) {
  console.log("Command:CreateTransaction", JSON.stringify(input));

  const transaction = await prisma.transaction.create({
    data: {
      type: input.type,
      amount: input.amount,
      provider: input.provider,
      email: input.email ?? "",
    },
  });

  console.log("Event:TransactionCreated", JSON.stringify(transaction));
  return transaction;
}

export async function listTransactions() {
  return prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default prisma;
export { prisma };
