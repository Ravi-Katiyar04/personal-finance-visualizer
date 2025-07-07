'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseBarChart({ transactions }) {
  const dailyTotals = {};

  transactions.forEach((txn) => {
    const dateKey = new Date(txn.date).toLocaleDateString();
    dailyTotals[dateKey] = (dailyTotals[dateKey] || 0) + txn.amount;
  });

  const data = Object.entries(dailyTotals).map(([date, amount]) => ({
    date,
    amount,
  }));

  return (
    <div className="h-[300px] sm:h-[350px] bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="text-sm font-semibold mb-2">Daily Net Transactions</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
