import React, { useEffect, useState } from "react";
import { trpc } from "../trpc";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    trpc.transactions.list
      .query()
      .then((res) => {
        console.log("res", res);
        setTransactions(res);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-6">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Type</th>
            <th className="p-2">Provider</th>
            <th className="p-2">Email</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t">
              <td className="p-2">{tx.type}</td>
              <td className="p-2">{tx.provider}</td>
              <td className="p-2">{tx.email}</td>
              <td className="p-2">{tx.amount}</td>
              <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
