import axios from 'axios';
import { Expense } from '../types/Expense';
import { Category } from '../types/Category';

const BASE_URL = import.meta.env.API_URL || 'https://smart-expense-tracker-qizk.onrender.com';
const LOCAL_EXPENSE_KEY = "local_expenses";
// 🚀 Expense APIs

export const loadLocalExpenses = (): Expense[] =>{ 
  const data = localStorage.getItem(LOCAL_EXPENSE_KEY);
  return data ? JSON.parse(data) : [];
}

export const saveLocalExpense = (expenses: Expense[] ) => {
  localStorage.setItem(LOCAL_EXPENSE_KEY,JSON.stringify(expenses));
}

const syncLoadAfterAdd = (expense: Expense) => {
  const current = loadLocalExpenses();
  saveLocalExpense([...current,expense]);
}

const syncLoadAfterDelete = (id: number) => {
  const current = loadLocalExpenses().filter((e)=> e.id !== id)
  saveLocalExpense(current);
}

export const getAllExpenses = async () => {
  try {
    const response = await axios.get<Expense[]>(`${BASE_URL}/expenses`);
    saveLocalExpense(response.data);
    return response;
  }
  catch(err) {
    return { data: loadLocalExpenses() } as any;
  }
}

export const getExpensesInRange = (start: string, end: string) =>
  axios.get<Expense[]>(`${BASE_URL}/expenses/range`, {
    params: { start, end },
  });

export const getExpensesByCategory = (name: string) =>
  axios.get<Expense[]>(`${BASE_URL}/expenses/category`, {
    params: { name },
  });

export const createExpense = async (expense: Expense) => {
try {
  const response = await axios.post<Expense>(`${BASE_URL}/expenses`, expense);
  syncLoadAfterAdd(response.data);
  return response;
}
catch(err) {
  const fakeExpense = {...expense, id: Date.now()};
  syncLoadAfterAdd(fakeExpense);
  return { data : fakeExpense } as any;
}
}

export const deleteExpense = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/expenses/${id}`);
    syncLoadAfterDelete(id);
  } catch {
    // Fallback to local delete
    syncLoadAfterDelete(id);
  }
}

export const downloadExpenseReportPDF = () =>
  axios.get(`${BASE_URL}/api/expenses/pdf`, {
    responseType: 'blob',
  });

export const resetBackendData = () => {
  localStorage.removeItem(LOCAL_EXPENSE_KEY);
  return axios.delete(`${BASE_URL}/expenses/reset`)
}

// 📦 Category APIs

export const getAllCategories = () =>
  axios.get<Category[]>(`${BASE_URL}/categories`);

export const addCategory = (category: Category) =>
  axios.post<Category>(`${BASE_URL}/categories`, category);
