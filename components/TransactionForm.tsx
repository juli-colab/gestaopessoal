
import React, { useState } from 'react';
import { Transaction, TransactionType, expenseCategories, incomeCategories } from '../types';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState(expenseCategories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    onSubmit({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    });
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(newType === TransactionType.EXPENSE ? expenseCategories[0] : incomeCategories[0]);
  };
  
  const categories = type === TransactionType.EXPENSE ? expenseCategories : incomeCategories;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-primary/50 rounded-lg space-y-4 animate-fade-in-down">
      <div className="flex bg-secondary rounded-lg p-1">
        <button type="button" onClick={() => handleTypeChange(TransactionType.EXPENSE)} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition ${type === TransactionType.EXPENSE ? 'bg-danger text-white' : 'hover:bg-primary/50'}`}>Despesa</button>
        <button type="button" onClick={() => handleTypeChange(TransactionType.INCOME)} className={`w-1/2 p-2 rounded-md text-sm font-semibold transition ${type === TransactionType.INCOME ? 'bg-success text-white' : 'hover:bg-primary/50'}`}>Receita</button>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Descrição</label>
        <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-primary border border-secondary rounded-md p-2 focus:ring-2 focus:ring-accent focus:border-accent" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">Valor</label>
          <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-primary border border-secondary rounded-md p-2 focus:ring-2 focus:ring-accent focus:border-accent" required />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Categoria</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-primary border border-secondary rounded-md p-2 focus:ring-2 focus:ring-accent focus:border-accent">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">Data</label>
        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-primary border border-secondary rounded-md p-2 focus:ring-2 focus:ring-accent focus:border-accent" required />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="py-2 px-4 bg-secondary hover:bg-primary/80 rounded-lg text-sm font-semibold">Cancelar</button>
        <button type="submit" className="py-2 px-4 bg-accent hover:bg-sky-400 text-primary rounded-lg text-sm font-bold">Adicionar</button>
      </div>
    </form>
  );
};

export default TransactionForm;
