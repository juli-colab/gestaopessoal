
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { TrashIcon } from './icons';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return <p className="text-text-secondary text-center py-8">Nenhuma transação ainda.</p>;
  }

  return (
    <ul className="space-y-3 h-96 overflow-y-auto pr-2">
      {transactions.map(t => (
        <li key={t.id} className="flex items-center justify-between bg-primary/60 p-3 rounded-lg hover:bg-primary transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-10 rounded-full ${t.type === TransactionType.INCOME ? 'bg-success' : 'bg-danger'}`}></div>
            <div>
              <p className="font-semibold">{t.description}</p>
              <p className="text-sm text-text-secondary">{t.category} - {new Date(t.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`font-bold ${t.type === TransactionType.INCOME ? 'text-success' : 'text-danger'}`}>
              {t.type === TransactionType.INCOME ? '+' : '-'} R$ {t.amount.toFixed(2)}
            </span>
            <button onClick={() => onDelete(t.id)} className="text-text-secondary hover:text-danger transition-colors p-1">
              <TrashIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
