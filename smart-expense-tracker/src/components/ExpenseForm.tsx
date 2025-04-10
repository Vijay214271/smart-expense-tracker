import { Expense } from '../types/Expense';
import { useEffect, useState } from 'react';
import styles from './ExpenseForm.module.scss';

type Props = {
  onSubmit: (expense: Expense) => void;
  initialExpense?: Expense; // 👈 optional for edit mode
};

const ExpenseForm = ({ onSubmit, initialExpense }: Props) => {
  const [expense, setExpense] = useState<Expense>({
    title: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    if (initialExpense) {
      setExpense(initialExpense); // 👈 pre-fill form when editing
    }
  }, [initialExpense]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: name === 'amount' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(expense);
    if (!initialExpense) {
      setExpense({
        title: '',
        amount: 0,
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          name="title"
          value={expense.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label}>Amount</label>
        <input
          className={styles.input}
          name="amount"
          type="number"
          value={expense.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label}>Category</label>
        <select
          className={styles.select}
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className={styles.label}>Date</label>
        <input
          className={styles.input}
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={styles.label}>Notes</label>
        <textarea
          className={styles.textarea}
          name="notes"
          value={expense.notes}
          onChange={handleChange}
        />
      </div>

      <button className={styles.button} type="submit">
        {initialExpense ? 'Update Expense' : 'Save Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
