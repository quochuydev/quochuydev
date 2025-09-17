import React, { useState } from "react";
import axios from "axios";

export default function PayOut({ onSuccess }) {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await trpc.transactions.paypalPayout.mutate({
      amount: Number(amount),
      email,
    });
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-2">Pay Out</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Pay Out
      </button>
    </form>
  );
}
