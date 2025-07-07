
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function BudgetBarChart({ transactions, budgets }) {
  // Calculate actual spent per category
  const totals = {};

  transactions.forEach((t) => {
    const cat = t.category?.trim() || 'Other';
    totals[cat] = (totals[cat] || 0) + t.amount;
  });

  // Combine all categories from budgets and transactions
  const categories = Array.from(new Set([...Object.keys(budgets), ...Object.keys(totals)]));

  // Build data with overspending status
  const data = categories
    .map((cat) => {
      const actual = totals[cat] || 0;
      const budget = budgets[cat] || 0;
      return {
        category: cat,
        actual,
        budget,
        overspent: actual > budget,
      };
    })
    .sort((a, b) => b.actual - b.budget - (a.actual - a.budget)); // Sort by overspending

  return (
    <div className="bg-white p-6 mt-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📊 Budget vs Spent Comparison
      </h3>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} barSize={40} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Bar
              dataKey="budget"
              fill="#3b82f6"
              name="Budget"
              animationDuration={800}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="actual"
              name="Spent"
              animationDuration={800}
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.overspent ? '#ef4444' : '#10b981'} // Red if overspent, green otherwise
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

