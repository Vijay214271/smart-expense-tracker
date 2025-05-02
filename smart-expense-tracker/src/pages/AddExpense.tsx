import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { createExpense } from '../services/api';
import { Expense } from '../types/Expense';
import styles from './AddExpense.module.scss';
import PageWrapper from '../components/PageWrapper';

const AddExpense = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (expense: Expense) => {
    try {
      await createExpense(expense);
      setSuccess(true);
      setError(null); // clear old errors
      setTimeout(() => setSuccess(false), 3000); // Auto-hide success msg
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data); // from backend (like future date)
      } else {
        setError('Something went wrong. Please try again.');
      }
      setSuccess(false);
    }
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.heading}>📝 Add New Expense</h1>

        <ExpenseForm onSubmit={handleSubmit} />

        {success && (
          <div className={styles.successMsg}>✅ Expense successfully added!</div>
        )}
        {error && (
          <div className={styles.errorMsg}>❌ {error}</div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AddExpense;
