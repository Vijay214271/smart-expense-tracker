import { downloadExpenseReportPDF } from '../services/api';
import styles from './PdfDownloadButton.module.scss';
import { toast } from 'react-toastify';

const PdfDownloadButton = () => {
  const handleDownload = async () => {
    try {
      const res = await downloadExpenseReportPDF();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('✅ PDF downloaded successfully');
    } catch (err) {
      toast.error('❌ Failed to download PDF');
    }
  };

  return (
    <button className={styles.downloadButton} onClick={handleDownload}>
      📄 Download PDF Report
    </button>
  );
};

export default PdfDownloadButton;
