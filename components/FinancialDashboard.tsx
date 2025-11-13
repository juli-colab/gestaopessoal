
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import SummaryChart from './SummaryChart';
import { PlusIcon } from './icons';

const FinancialDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage", error);
    }
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [newTransaction, ...prev]);
    setIsFormVisible(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-text-secondary text-sm font-medium">Receita Total</h3>
          <p className="text-2xl font-semibold text-success mt-1">R$ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-text-secondary text-sm font-medium">Despesa Total</h3>
          <p className="text-2xl font-semibold text-danger mt-1">R$ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-text-secondary text-sm font-medium">Balanço</h3>
          <p className={`text-2xl font-semibold mt-1 ${balance >= 0 ? 'text-text-primary' : 'text-danger'}`}>
            R$ {balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Visão Geral das Despesas</h2>
          <SummaryChart data={transactions} />
        </div>
        
        <div className="bg-secondary p-6 rounded-lg shadow-lg space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-xl font-bold">Transações Recentes</h2>
             <button onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center gap-2 bg-highlight hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                <PlusIcon />
                <span>Nova</span>
             </button>
          </div>
          
          {isFormVisible && <TransactionForm onSubmit={addTransaction} onCancel={() => setIsFormVisible(false)} />}

          <TransactionList transactions={transactions.slice(0, 10)} onDelete={deleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
