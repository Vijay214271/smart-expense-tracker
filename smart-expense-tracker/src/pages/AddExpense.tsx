import ExpenseForm from '../components/ExpenseForm';
import { createExpense } from '../services/api';
import { Expense } from '../types/Expense';
import styles from './AddExpense.module.scss';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

const AddExpense = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (expense: Expense) => {
    await createExpense(expense);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Auto-hide success msg
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.heading}>📝 Add New Expense</h1>

        <ExpenseForm onSubmit={handleSubmit} />

        {success && (
          <div className={styles.successMsg}>✅ Expense successfully added!</div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AddExpense;
