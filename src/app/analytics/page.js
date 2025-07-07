"use client"
import Navbar from "@/components/Navbar";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import { useTransactions } from '@/context/TransactionContext';
export default function Analytics() {
  const { transactions, loading } = useTransactions();
  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MonthlyBarChart transactions={transactions} />
          <ExpensePieChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

