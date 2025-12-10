import { useState } from "react";

export function useInputState({ onAdd }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let deadline = null;
    if (deadlineDate) {
      const dateTimeString = deadlineTime
        ? `${deadlineDate}T${deadlineTime}`
        : `${deadlineDate}T23:59`;
      deadline = new Date(dateTimeString);
    }

    onAdd(
      text.trim(),
      category,
      priority,
      assignedTo.trim() || "Не назначено",
      deadline
    );

    // Сброс формы
    setText("");
    setAssignedTo("");
    setDeadlineDate("");
    setDeadlineTime("");
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxAllowedDate = maxDate.toISOString().split("T")[0];
  const isPastDate = deadlineDate && deadlineDate < today;

  return {
    text,
    setText,
    category,
    setCategory,
    priority,
    setPriority,
    assignedTo,
    setAssignedTo,
    deadlineDate,
    setDeadlineDate,
    deadlineTime,
    setDeadlineTime,
    today,
    maxAllowedDate,
    isPastDate,
    handleSubmit,
  };
}
