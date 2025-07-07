'use client';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#34d399', '#f87171', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6'];

export default function ExpensePieChart({ transactions }) {
  const categoryTotals = {};

  transactions
    .filter((t) => t.amount < 0)
    .forEach((t) => {
      const key = t.category || 'Other';
      categoryTotals[key] = (categoryTotals[key] || 0) + Math.abs(t.amount);
    });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6 h-[300px]">
      <h3 className="text-sm font-semibold mb-2">Expenses by Category</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}



