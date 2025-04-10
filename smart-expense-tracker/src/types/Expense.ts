export interface Expense {
    id?: number;
    title: string;
    amount: number;
    category: string;
    date: string; // ISO string format, e.g., '2024-04-07'
    notes: string;
  }
  