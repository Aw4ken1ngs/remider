import React from "react";
import styles from "./reminder-list.module.css";

export function ReminderList({
  reminders,
  filter,
  onEditClick,
  deleteReminder,
  setIsPopupOpen
}) {
  const filteredReminders = reminders.filter((reminder) => {
    if (filter === "completed") {
      return reminder.status === "completed";
    }
    if (filter === "overdue") {
      const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
      return reminder.status === "pending" && Date.now() >= reminderDateTime.getTime();
    }
    return reminder.status === "pending" && Date.now() < new Date(`${reminder.date}T${reminder.time}`);
  });

  const onEdit = (reminder) => {
    onEditClick(reminder.id)
    setIsPopupOpen(true)
  }
  return (
    <div className={styles['reminder-list']}>
      {filteredReminders.length > 0 ? (
        filteredReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`${styles['reminder-card']} ${reminder.status === "overdue" ? styles['overdue'] : ""}`}
          >
            <div className={styles['reminder-details']}>
              <span className={styles['reminder-title']}>{reminder.title}</span>
              <span className={styles['reminder-content']}>{reminder.content}</span>
              <div className={styles['reminder-footer']}>
                <span className={styles['reminder-datetime']}>
                  {reminder.date} | {reminder.time}
                </span>
              </div>
            </div>
            <div className={styles['reminder-actions']}>
              <button onClick={() => onEdit(reminder)}>Редактировать</button>
              <button onClick={() => deleteReminder(reminder.id)}>Удалить</button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles['no-reminders']}>Нет напоминаний</p>
      )}
    </div>
  );
}
