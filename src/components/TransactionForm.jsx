

'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TransactionForm({ onAdd, transactions }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amt = parseFloat(amount);

    // ✅ Validation
    if (!amt || amt <= 0) {
      toast.error('Enter a valid amount greater than 0');
      return;
    }

    if (!date) {
      toast.error('Please select a date');
      return;
    }

    if (!description || description.trim().length < 3) {
      toast.error('Description should be at least 3 characters long');
      return;
    }

    // ✅ Duplicate check (warn but don't block)
    const isDuplicate = transactions.some((txn) =>
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

    // ✅ Submit transaction
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

      // Reset form
      setAmount('');
      setDate('');
      setDescription('');
      setCategory('Food');
    } catch (err) {
      toast.error('Failed to add transaction. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="e.g. 1200"
        />
      </div>

      <div>
        <label className="block font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
          placeholder="e.g. Grocery shopping"
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
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

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}

