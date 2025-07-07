'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [monthFilter, setMonthFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, monthFilter, categoryFilter]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      toast.error('Failed to fetch transactions');
    }
  };

  const applyFilters = () => {
    let filtered = transactions;

    if (monthFilter) {
      filtered = filtered.filter((txn) => {
        const txnMonth = new Date(txn.date).getMonth() + 1;
        return txnMonth === parseInt(monthFilter);
      });
    }

    if (categoryFilter) {
      filtered = filtered.filter((txn) => txn.category === categoryFilter);
    }

    setFilteredTransactions(filtered);
    setVisibleCount(10);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
      toast.error('Transaction deleted');
    } catch {
      toast.error('Delete failed');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const updated = await res.json();
      setTransactions((prev) =>
        prev.map((txn) => (txn._id === editId ? updated : txn))
      );
      setEditId(null);
      setEditData({});
      toast.success('Transaction updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">💰 Personal Finance Visualizer</h1>

        {/* Filters */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Month</label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2"
            >
              <option value="">All Months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm px-3 py-2"
            >
              <option value="">All Categories</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Rent</option>
              <option>Shopping</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleTransactions.map((txn) => (
                <tr key={txn._id} className="hover:bg-gray-50 transition">
                  {editId === txn._id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editData.amount}
                          onChange={(e) =>
                            setEditData({ ...editData, amount: parseFloat(e.target.value) })
                          }
                          className="w-full border px-2 py-1 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({ ...editData, category: e.target.value })
                          }
                          className="w-full border px-2 py-1 rounded-md"
                        >
                          <option>Food</option>
                          <option>Travel</option>
                          <option>Rent</option>
                          <option>Shopping</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editData.description}
                          onChange={(e) =>
                            setEditData({ ...editData, description: e.target.value })
                          }
                          className="w-full border px-2 py-1 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                          className="w-full border px-2 py-1 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={handleEditSubmit}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium text-gray-900">₹{txn.amount}</td>
                      <td className="px-6 py-4">{txn.category}</td>
                      <td className="px-6 py-4">{txn.description}</td>
                      <td className="px-6 py-4">{new Date(txn.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 space-x-4">
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
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show More */}
        {visibleCount < filteredTransactions.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


