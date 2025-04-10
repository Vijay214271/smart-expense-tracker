import PdfDownloadButton from '../components/PdfDownloadButton';
import Charts from '../components/Charts';
import PageWrapper from '../components/PageWrapper';
import styles from './Reports.module.scss'; // 👈 SCSS Module

const Reports = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <h1 className={styles.heading}>📈 Monthly Report Overview</h1>
        <p className={styles.description}>
          Visualize your spending trends and download detailed reports to keep track of your finances.
        </p>

        <div className={styles.downloadSection}>
          <PdfDownloadButton />
        </div>

        <Charts />
      </div>
    </PageWrapper>
  );
};

export default Reports;
