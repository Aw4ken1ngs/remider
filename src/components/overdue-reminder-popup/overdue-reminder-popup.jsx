import styles from "./overdue-reminder-popup.module.css";

export function OverdueReminderPopup({ overdueReminders, markAsCompleted, remindLater }) {
  if (overdueReminders.length === 0) return null;

  return (
    <div className={`${styles.popup} ${styles['overdue-popup']}`}>
      <h2>Просроченные напоминания</h2>
      {overdueReminders.map((reminder) => (
        <div key={reminder.id} className={styles['overdue-reminder']}>
          <p><strong>{reminder.title}</strong></p>
          <p>{reminder.content}</p>
          <p>
            Дата: {reminder.date} | Время: {reminder.time}
          </p>
          <button onClick={() => markAsCompleted(reminder.id)}>Ок</button>
          <button onClick={() => remindLater(reminder.id)}>Напомнить позже</button>
        </div>
      ))}
    </div>
  );
}
