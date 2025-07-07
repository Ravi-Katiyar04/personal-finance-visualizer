
'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TransactionForm({ onAdd, transactions, setShowForm }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error('Enter a valid amount greater than 0');
    if (!date) return toast.error('Please select a date');
    if (!description || description.trim().length < 3)
      return toast.error('Description should be at least 3 characters long');

    const isDuplicate = transactions.some(
      (txn) =>
        txn.amount === amt &&
        txn.date.slice(0, 10) === date &&
        txn.description.trim().toLowerCase() === description.trim().toLowerCase() &&
        txn.category === category
    );

    if (isDuplicate) {
      toast.warning('Duplicate transaction detected', {
        description: 'This entry looks similar to an existing transaction.',
      });
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({ amount: amt, date, description, category }),
      });

      const newTxn = await res.json();
      onAdd(newTxn);

      toast.success('Transaction added', {
        description: `₹${newTxn.amount} - ${newTxn.category}`,
      });

      // Reset
      setAmount('');
      setDate('');
      setDescription('');
      setCategory('Food');

      // Optional: Close form after submission
      if (setShowForm) setShowForm(false);
    } catch (err) {
      toast.error('Failed to add transaction. Try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-xl shadow-md border"
    >
      <div>
        <label className="block font-medium text-sm text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="e.g. 1200"
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="e.g. Grocery shopping"
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Rent</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
      </div>

      <div className="flex gap-4 justify-end pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Add Transaction
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
