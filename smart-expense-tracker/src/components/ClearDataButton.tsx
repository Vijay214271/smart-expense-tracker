import { resetBackendData } from "../services/api";
import styles from "./ClearDataButton.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClearDataButton = () => {
  const handleClear = async () => {
    const confirmed = confirm("Are you sure you want to clear all local data?");
    if (!confirmed) return;

    localStorage.removeItem("local_expenses");
    localStorage.removeItem("local_categories");
    await resetBackendData();

    toast.success("✅ All local data cleared!");
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <div className={styles.tooltipWrapper}>
      <button className={styles.clearButton} onClick={handleClear}>
        🗑 Clear Local Data
      </button>
      <span className={styles.tooltipText}>
        This will erase all stored data and reload the page.
      </span>
    </div>
  );
};

export default ClearDataButton;
