import styles from "./remider-filter.module.css";

export function ReminderFilters({ setFilter }) {
  return (
    <div className={styles.filters}>
      <button onClick={() => setFilter("pending")}>Ожидаемые</button>
      <button onClick={() => setFilter("completed")}>Выполненные</button>
      <button onClick={() => setFilter("overdue")}>Просроченные</button>
    </div>
  );
} 
