'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetBarChart({ transactions, budgets }) {
  const totals = {};

  transactions
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      const cat = t.category || 'Other';
      totals[cat] = (totals[cat] || 0) + Math.abs(t.amount);
    });

  const categories = Array.from(new Set([...Object.keys(budgets), ...Object.keys(totals)]));

  const data = categories.map((cat) => ({
    category: cat,
    actual: totals[cat] || 0,
    budget: budgets[cat] || 0,
  }));

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h3 className="text-sm font-semibold mb-2">📊 Budget vs Actual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#60a5fa" name="Budget" />
          <Bar dataKey="actual" fill="#f87171" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
