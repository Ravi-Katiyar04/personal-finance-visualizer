'use client';
import { useState } from 'react';
import { toast } from 'sonner';


export default function BudgetManager({categories, budgets, setBudgets }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddBudget = () => {
    const val = parseFloat(amount);
    if (!category || !val || val <= 0) return toast.error('Invalid budget');

    setBudgets({ ...budgets, [category]: val });
    toast.success(`Set ₹${val} budget for ${category}`);
    setAmount('');
    setCategory('');
  };

  return (
    <div className="bg-white shadow p-4 rounded mt-6">
      
      <h3 className="font-semibold mb-3">📅 Monthly Budgets</h3>

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-sm">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Budget ₹</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        <button
          onClick={handleAddBudget}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add / Update
        </button>
      </div>
    </div>
  );
}
