import { useEffect, useState } from 'react';
import { Expense } from '../types/Expense';
import { getAllExpenses, deleteExpense } from '../services/api';
import ExpenseList from '../components/ExpenseList';
import Charts from '../components/Charts';
import ClearDataButton from '../components/ClearDataButton';
import PageWrapper from '../components/PageWrapper';
import styles from './Home.module.scss';

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () =>
    getAllExpenses().then(res => setExpenses(res.data));

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    loadExpenses();
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.heading}>📊 Expense Dashboard</h1>

        <ClearDataButton />

        <div className={styles.section}>
          <Charts />
        </div>

        <div className={styles.section}>
          <h2>All Expenses</h2>
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
