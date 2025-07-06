'use client';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardSummary({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <Card className="bg-green-50">
        <CardContent className="p-4">
          <p className="text-sm text-green-800 font-medium">Total Income</p>
          <p className="text-2xl font-semibold text-green-700">₹{income}</p>
        </CardContent>
      </Card>

      <Card className="bg-red-50">
        <CardContent className="p-4">
          <p className="text-sm text-red-800 font-medium">Total Expense</p>
          <p className="text-2xl font-semibold text-red-700">₹{expense}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800 font-medium">Net Balance</p>
          <p className="text-2xl font-semibold text-blue-700">₹{balance}</p>
        </CardContent>
      </Card>
    </div>
  );
}


