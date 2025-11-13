
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const expenseCategories = [
  "Food", "Housing", "Transport", "Entertainment", "Health", "Shopping", "Bills", "Other"
];

export const incomeCategories = [
  "Salary", "Freelance", "Investment", "Gift", "Other"
];
