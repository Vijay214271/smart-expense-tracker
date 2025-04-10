import { useEffect, useState } from 'react';
import { Category } from '../types/Category';
import { getAllCategories } from '../services/api';
import styles from './CategorySelect.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ value, onChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="category-select" className={styles.label}>
        Filter by Category
      </label>
      <select
        id="category-select"
        className={styles.select}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
