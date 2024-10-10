import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { ReminderList } from "./components/remider-list/remider-list";
import { ReminderForm } from "./components/remider-form/remider-form";
import { ReminderFilters } from "./components/remider-filters/remider-filter";
import { OverdueReminderPopup} from "./components/overdue-reminder-popup/overdue-reminder-popup"; 


let idCounter = 0;
function generateUniqueId() {
  idCounter++;
  return `id-${idCounter}-${Date.now()}`;
}

export default function App() {
  const [reminders, setReminders] = useState([]);
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [overdueReminders, setOverdueReminders] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const intervalID = useRef(null);

  useEffect(() => {
    clearInterval(intervalID.current);
    intervalID.current = window.setInterval(() => {
      const newOverdue = reminders.filter(
        (reminder) =>
          reminder.status === "pending" &&
          Date.now() >= new Date(`${reminder.date}T${reminder.time}`)
      );
      setOverdueReminders(newOverdue);
    }, 100);
  }, [reminders]);

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem("reminders"));
    if (storedReminders) {
      setReminders(storedReminders);
    }
  }, []);

  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  }, [reminders]);

  const createReminder = (title, content, time, date) => {
    let id = generateUniqueId();
    const newReminder = { title, content, time, date, id, status: "pending" };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };

  const editReminder = (title, content, time, date, id) => {
    const remindersDraft = reminders.map((reminder) => {
      if (reminder.id === id) {
        return { title, content, time, date, id, status: reminder.status };
      }
      return reminder;
    });
    setReminders(remindersDraft);
    setEditingReminderId(null);
  };

  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
    setOverdueReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const remindLater = (id) => {
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id === id) {
        const newTime = new Date(`${reminder.date}T${reminder.time}`);
        newTime.setMinutes(newTime.getMinutes() + 10);
        return {
          ...reminder,
          time: newTime.toTimeString().slice(0, 5),
        };
      }
      return reminder;
    });
    setReminders(updatedReminders);
  };

  const markAsCompleted = (id) => {
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id === id) {
        return { ...reminder, status: "completed" };
      }
      return reminder;
    });
    setReminders(updatedReminders);
    setOverdueReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="App">
      <button className="create-btn" onClick={() => setIsPopupOpen(true)}>Создать напоминание</button>
      {isPopupOpen && (
        <ReminderForm
          setIsPopupOpen={setIsPopupOpen}
          createReminder={createReminder}
          editReminder={editReminder}
          editingReminderId={editingReminderId}
          setEditingReminderId={setEditingReminderId}
          reminders={reminders}
        />
      )}
      <ReminderFilters setFilter={setFilter} />
      <ReminderList
        reminders={reminders}
        filter={filter}
        deleteReminder={deleteReminder}
        onEditClick={setEditingReminderId}
        markAsCompleted={markAsCompleted}
        remindLater={remindLater}
        setIsPopupOpen={setIsPopupOpen}
      />
      <OverdueReminderPopup
        overdueReminders={overdueReminders}
        markAsCompleted={markAsCompleted}
        remindLater={remindLater}
      />
    </div>
  );
}