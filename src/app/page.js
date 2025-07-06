'use client';

import { useState, useEffect } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyBarChart from '@/components/MonthlyBarChart';

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleAdd = (newTxn) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
      <TransactionForm onAdd={handleAdd} transactions={transactions} />
      <TransactionList transactions={transactions} setTransactions={setTransactions} />
      <MonthlyBarChart transactions={transactions} />
    </div>
  );
}



