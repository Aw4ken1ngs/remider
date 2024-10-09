import { useState, useEffect } from "react";
import styles from './reminder-form.module.css';

export function ReminderForm({
  setIsPopupOpen,
  createReminder,
  editReminder,
  editingReminderId,
  setEditingReminderId,
  reminders,
}) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    time: "",
    date: "",
    status: "pending",
  });

  useEffect(() => {
    if (editingReminderId) {
      const reminder = reminders.find((r) => r.id === editingReminderId);
      if (reminder) {
        setForm({
          title: reminder.title,
          content: reminder.content,
          time: reminder.time,
          date: reminder.date,
          status: reminder.status,
        });
      }
    }
  }, [editingReminderId, reminders]);

  const onFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    if (editingReminderId) {
      editReminder(form.title, form.content, form.time, form.date, editingReminderId);
    } else {
      createReminder(form.title, form.content, form.time, form.date);
    }
    setForm({
      title: "",
      content: "",
      time: "",
      date: "",
      status: "pending",
    });
    setIsPopupOpen(false);
  };

  return (
    <div className={styles['overlay']}>
      <div className={styles['popup']}>
        <h2>{editingReminderId ? "Редактировать напоминание" : "Создать напоминание"}</h2>
        <input name="title" type="text" value={form.title} onChange={onFormChange} placeholder="Название" />
        <input name="content" type="text" value={form.content} onChange={onFormChange} placeholder="Описание" />
        <input name="date" type="date" value={form.date} onChange={onFormChange} placeholder="Дата" />
        <input name="time" type="time" value={form.time} onChange={onFormChange} placeholder="Время" />
        <button onClick={onSubmit}>{editingReminderId ? "Обновить" : "Создать"}</button>
        <button onClick={() => setIsPopupOpen(false)}>Закрыть</button>
        {editingReminderId && <button onClick={() => setEditingReminderId(null)}>Отмена</button>}
      </div>
    </div>
  );
}
