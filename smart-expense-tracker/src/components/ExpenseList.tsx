import { Expense } from '../types/Expense';
import styles from './ExpenseList.module.scss';

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>₹{exp.amount.toFixed(2)}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>{exp.notes}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => onDelete(exp.id!)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && <p className={styles.noData}>No expenses found.</p>}
    </div>
  );
};

export default ExpenseList;
