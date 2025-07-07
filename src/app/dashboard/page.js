'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import DashboardSummary from '@/components/DashboardSummary';
import TransactionList from '@/components/TransactionList';
import { useTransactions } from '@/context/TransactionContext';


export default function Dashboard() {
  const { transactions,setTransactions, loading } = useTransactions();

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((txn) => txn._id !== id));
  };

  useEffect(() => {
    if (loading) {
      toast.loading('Loading...');
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Dashboard</h1>
          <p className="text-lg text-gray-700">Track and manage your financial transactions with ease.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <DashboardSummary transactions={transactions} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <TransactionList transactions={transactions} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
