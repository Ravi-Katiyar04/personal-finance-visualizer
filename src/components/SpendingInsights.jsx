
'use client';

import {
  Utensils,
  Bus,
  Home,
  ShoppingBag,
  PiggyBank,
  CircleDollarSign,
} from 'lucide-react';

const categoryIcons = {
  Food: <Utensils className="w-4 h-4 text-gray-500" />,
  Travel: <Bus className="w-4 h-4 text-gray-500" />,
  Rent: <Home className="w-4 h-4 text-gray-500" />,
  Shopping: <ShoppingBag className="w-4 h-4 text-gray-500" />,
  Other: <PiggyBank className="w-4 h-4 text-gray-500" />,
};

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
    <div className="bg-white p-6 mt-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">🧾 Spending Insights</h3>

      <ul className="space-y-5">
        {insights.map(({ category, spent, budget, percent }) => {
          const overBudget = percent > 100;
          const icon = categoryIcons[category] || <CircleDollarSign className="w-4 h-4 text-gray-500" />;

          return (
            <li key={category}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                </div>
                <span className="text-sm text-gray-600">
                  ₹{spent} / ₹{budget} ({percent}%)
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    overBudget ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                ></div>
              </div>

              {overBudget && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  ⚠️ Over budget
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


