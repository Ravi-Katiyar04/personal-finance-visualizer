
'use client';
import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CalendarDays } from 'lucide-react';

export default function MonthlyBarChart({ transactions }) {
  const data = useMemo(() => {
    const totals = {};

    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
      totals[month] = (totals[month] || 0) + txn.amount;
    });

    return Object.entries(totals).map(([month, total]) => ({
      month,
      total: Math.abs(total),
    }));
  }, [transactions]);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          Monthly Expenses
        </h2>
        <p className="text-sm text-gray-500">Visual breakdown by month</p>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
              }}
              formatter={(value) => [`₹${value}`, 'Total']}
            />
            <Bar
              dataKey="total"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
