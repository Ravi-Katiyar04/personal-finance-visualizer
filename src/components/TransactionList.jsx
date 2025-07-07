
'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TransactionList({transactions, setTransactions }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/transactions/${id}`, { method: 'DELETE' });

      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
      toast.error('Transaction deleted');
    } catch (err) {
      toast.error('Failed to delete transaction');
    }
  };

  const handleEdit = (txn) => {
    setEditId(txn._id);
    setEditData({
      amount: txn.amount,
      date: txn.date.slice(0, 10),
      description: txn.description,
      category: txn.category,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/transactions/${editId}`, {
        method: 'PUT',
        body: JSON.stringify(editData),
      });

      const updatedTxn = await res.json();

      setTransactions((prev) =>
        prev.map((txn) => (txn._id === editId ? updatedTxn : txn))
      );

      setEditId(null);
      setEditData({});
      toast.success('Transaction updated', {
        description: `₹${updatedTxn.amount} - ${updatedTxn.category}`,
      });
    } catch (err) {
      toast.error('Failed to update transaction');
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Recent Transactions
      </h2>

      <ul className="space-y-4">
        {transactions.slice(-3).reverse().map((txn) =>
          editId === txn._id ? (
            <li
              key={txn._id}
              className="bg-yellow-50 p-4 rounded-lg shadow border space-y-3"
            >
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Amount"
                  className="w-full border px-3 py-2 rounded"
                />

                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />

                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="w-full border px-3 py-2 rounded"
                />

                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Rent</option>
                  <option>Shopping</option>
                  <option>Other</option>
                </select>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </li>
          ) : (
            <li
              key={txn._id}
              className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">
                  ₹{txn.amount} - {txn.category}
                </p>
                <p className="text-sm text-gray-500">{txn.description}</p>
                <p className="text-xs text-gray-400">
                  {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 text-sm mt-1">
                <button
                  onClick={() => handleEdit(txn)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(txn._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
