'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TransactionForm from './TransactionForm';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [monthFilter, setMonthFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

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
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Personal Finance Visualizer</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          <Plus size={18} />
          {showForm ? 'Close Form' : 'Add Payment'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6">
          <TransactionForm
            transactions={transactions}
            onAdd={(newTxn) => {
              setTransactions((prev) => [newTxn, ...prev]);
              setShowForm(false);
            }}
            setShowForm={setShowForm}
          />
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Rent</option>
            <option>Shopping</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-left font-medium">
            <tr>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleTransactions.map((txn) => (
              <tr key={txn._id}>
                {editId === txn._id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: parseFloat(e.target.value) })
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded"
                      >
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Rent</option>
                        <option>Shopping</option>
                        <option>Other</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({ ...editData, description: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) =>
                          setEditData({ ...editData, date: e.target.value })
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={handleEditSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-300 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 font-medium text-gray-800">₹{txn.amount}</td>
                    <td className="px-4 py-3">{txn.category}</td>
                    <td className="px-4 py-3">{txn.description}</td>
                    <td className="px-4 py-3">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex gap-2 items-center">
                      <button
                        onClick={() => handleEdit(txn)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(txn._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {visibleCount < filteredTransactions.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}