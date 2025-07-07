
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { Banknote, ArrowDownCircle, Wallet } from 'lucide-react'; // ✅ Lucide icons

export default function DashboardSummary({ transactions }) {
  const [incomeInput, setIncomeInput] = useState(300000);
  const [income, setIncome] = useState(300000);

  useEffect(() => {
    const savedIncome = localStorage.getItem('userIncome');
    if (savedIncome) {
      setIncome(parseFloat(savedIncome));
      setIncomeInput(parseFloat(savedIncome));
    }
  }, []);

  const handleSetIncome = () => {
    localStorage.setItem('userIncome', incomeInput);
    setIncome(incomeInput);
  };

  const expense = transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = income - expense;

  return (
    <div className="space-y-6 mt-6">
      {/* Income Setter */}
      <Card className="border bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-medium text-gray-800">
            Set Yearly Income
          </CardTitle>
          <CardDescription>Enter your expected yearly income below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
            <input
              type="number"
              value={incomeInput}
              onChange={(e) => setIncomeInput(parseFloat(e.target.value) || 0)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 300000"
            />
            <button
              onClick={handleSetIncome}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
            >
              Set Income
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-green-800">Total Income</CardTitle>
              <CardDescription className="text-2xl font-semibold text-green-700">
                ₹{income.toLocaleString()}
              </CardDescription>
            </div>
            <Banknote className="h-10 w-10 text-green-500" />
          </CardHeader>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-red-800">Total Expense</CardTitle>
              <CardDescription className="text-2xl font-semibold text-red-700">
                ₹{expense.toLocaleString()}
              </CardDescription>
            </div>
            <ArrowDownCircle className="h-10 w-10 text-red-500" />
          </CardHeader>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-blue-800">Net Balance</CardTitle>
              <CardDescription
                className={`text-2xl font-semibold ${
                  balance >= 0 ? 'text-blue-700' : 'text-red-600'
                }`}
              >
                ₹{balance.toLocaleString()}
              </CardDescription>
            </div>
            <Wallet className="h-10 w-10 text-blue-500" />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
