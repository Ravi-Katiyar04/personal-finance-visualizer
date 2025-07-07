
'use client';

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#34d399', '#f87171', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6'];

// Custom Tooltip component with percentage
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, payload: all } = payload[0];
    const total = all.total;
    const percent = ((value / total) * 100).toFixed(1);

    return (
      <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
        <p className="font-medium">{name}</p>
        <p>
          ₹{value} ({percent}%)
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensePieChart({ transactions }) {
  // Group total amount spent per category
  const categoryTotals = {};

  transactions.forEach((txn) => {
    const category = txn.category || 'Other';
    categoryTotals[category] = (categoryTotals[category] || 0) + txn.amount;
  });

  const total = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0);

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    total,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Expenses by Category</h3>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No transactions to show.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={50}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
