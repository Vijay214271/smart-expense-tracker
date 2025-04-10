import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.message}>Oops! Page Not Found</h2>
      <p className={styles.description}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={styles.backLink}>← Go back home</Link>
    </div>
  );
};

export default NotFound;
