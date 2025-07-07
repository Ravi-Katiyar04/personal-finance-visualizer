

'use client';
import { useState, useEffect } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import DashboardSummary from '@/components/DashboardSummary';
import ExpensePieChart from '@/components/ExpensePieChart';
import BudgetManager from '@/components/BudgetManager';
import BudgetBarChart from '@/components/BudgetBarChart';
import SpendingInsights from '@/components/SpendingInsights';
import MonthlyBarChart from '@/components/MonthlyBarChart';
import Layout from '@/components/Layout';

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleAdd = (txn) => {
    setTransactions((prev) => [txn, ...prev]);
  };

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  return (
    <Layout>
      <TransactionForm onAdd={handleAdd} transactions={transactions} />
      <MonthlyBarChart transactions={transactions} />
      <DashboardSummary transactions={transactions} />
      <BudgetManager categories={categories} budgets={budgets} setBudgets={setBudgets} />
      <SpendingInsights transactions={transactions} budgets={budgets} />
      <BudgetBarChart transactions={transactions} budgets={budgets} />
      <ExpensePieChart transactions={transactions} />
      <TransactionList transactions={transactions} />
    </Layout>
  );
}

