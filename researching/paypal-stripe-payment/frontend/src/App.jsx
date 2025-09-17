import React, { useState } from "react";
import PayIn from "./components/PayIn";
import PayOut from "./components/PayOut";
import TransactionList from "./components/TransactionList";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => setRefresh((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">PayApp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PayIn onSuccess={handleSuccess} />
        <PayOut onSuccess={handleSuccess} />
      </div>
      <TransactionList refresh={refresh} />
    </div>
  );
}
