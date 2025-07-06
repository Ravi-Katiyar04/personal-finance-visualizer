'use client';

export default function SpendingInsights({ transactions, budgets }) {
  const insights = [];

  Object.entries(budgets).forEach(([category, budget]) => {
    const spent = transactions
      .filter((t) => t.amount < 0 && t.category === category)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const percent = ((spent / budget) * 100).toFixed(1);
    insights.push({ category, spent, budget, percent });
  });

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h3 className="font-semibold mb-3">🧾 Insights</h3>
      <ul className="space-y-2 text-sm">
        {insights.map(({ category, spent, budget, percent }) => (
          <li key={category}>
            {category}: ₹{spent} / ₹{budget} ({percent}%)
            {percent > 100 && <span className="text-red-500 ml-2">Over budget ⚠️</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
