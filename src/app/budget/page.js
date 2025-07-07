'use client';
import { useState, useEffect } from 'react';
import BudgetManager from '@/components/BudgetManager';
import Navbar from '@/components/Navbar';
import SpendingInsights from '@/components/SpendingInsights';
import BudgetBarChart from '@/components/BudgetBarChart';
import { useTransactions } from '@/context/TransactionContext';

export default function BudgetPage() {
  const { transactions, loading } = useTransactions();
  const [data, setData] = useState(null);
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    if (!loading) {
      setData(transactions);
    }
  }, [transactions, loading]);

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Budget Management
          </h1>

          {data ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <BudgetManager
                    categories={categories}
                    budgets={budgets}
                    setBudgets={setBudgets}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <SpendingInsights
                    transactions={transactions}
                    budgets={budgets}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <BudgetBarChart
                  transactions={transactions}
                  budgets={budgets}
                />
              </div>
            </div>
          ) : (
            <div className="text-gray-600 text-lg text-center mt-20">
              Loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
}


