

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
  Food: <Utensils className="w-4 h-4 text-blue-600" />,
  Travel: <Bus className="w-4 h-4 text-yellow-600" />,
  Rent: <Home className="w-4 h-4 text-red-600" />,
  Shopping: <ShoppingBag className="w-4 h-4 text-pink-600" />,
  Other: <PiggyBank className="w-4 h-4 text-green-600" />,
};

export default function SpendingInsights({ transactions, budgets }) {
  // Compute insights per category
  const insights = Object.entries(budgets).map(([category, budget]) => {
    const spent = transactions
      .filter((txn) =>
        txn.category?.trim().toLowerCase() === category.trim().toLowerCase()
      )
      .reduce((acc, txn) => acc + txn.amount, 0);

    const percent = ((spent / budget) * 100).toFixed(1);
    return { category, spent, budget, percent };
  });

  return (
    <div className="bg-white p-6 mt-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🧾 Spending Insights
      </h3>

      {insights.length === 0 ? (
        <p className="text-sm text-gray-500">No budget set yet.</p>
      ) : (
        <ul className="space-y-5">
          {insights.map(({ category, spent, budget, percent }) => {
            const overBudget = percent > 100;
            const icon = categoryIcons[category] || (
              <CircleDollarSign className="w-4 h-4 text-gray-500" />
            );

            return (
              <li key={category}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>
                  <span
                    className={`text-sm ${overBudget ? 'text-red-600 font-medium' : 'text-gray-600'}`}
                  >
                    ₹{spent} / ₹{budget} ({percent}%)
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      overBudget ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${Math.min(percent, 100)}%`,
                    }}
                  ></div>
                </div>

                {overBudget && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    ⚠️ You’ve exceeded your budget!
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
