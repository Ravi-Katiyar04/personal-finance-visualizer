'use client';
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyBarChart({ transactions }) {
  const data = useMemo(() => {
    const totals = {};

    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
      totals[month] = (totals[month] || 0) + txn.amount;
    });

    return Object.entries(totals).map(([month, total]) => ({ month, total }));
  }, [transactions]);

  return (
    <div className="p-4 my-6 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}