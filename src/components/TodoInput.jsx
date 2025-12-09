import { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES, PRIORITIES } from "../utils/constants";

export const TodoInput = ({ onAdd, existingAssignees }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Добавить новую задачу
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Основная строка */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Что нужно сделать?"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <Plus size={20} />
            Добавить
          </button>
        </div>

        {/* Дополнительные поля */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Категория */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full
                appearance-none
                px-3
                py-2.5
                pr-8
                border
                border-gray-300
                rounded-lg
                bg-white
                text-gray-700
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                hover:border-gray-400
                transition
              ">
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {/* Стрелка */}
            <div className="pointer-events-none absolute inset-y-0 top-5 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Приоритет */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Приоритет
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="
                w-full
                appearance-none
                px-3
                py-2.5
                pr-8
                border
                border-gray-300
                rounded-lg
                bg-white
                text-gray-700
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                hover:border-gray-400
                transition
              ">
              {PRIORITIES.map((pri) => (
                <option key={pri.id} value={pri.id}>
                  {pri.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-5 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Ответственный */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ответственный
            </label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Введите имя"
              list="assignee-list"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <datalist id="assignee-list">
              {existingAssignees.map((assignee, index) => (
                <option key={index} value={assignee} />
              ))}
            </datalist>
          </div>

          {/* Дата */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата
            </label>

            {/* Проверка ошибки */}

            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              min={today}
              max={maxAllowedDate}
              className={`
      w-full
      px-3
      py-2.5
      pr-8
      rounded-lg
      border
      text-sm
      appearance-none
      focus:outline-none
      transition
      ${
        isPastDate
          ? "border-red-500 text-red-600 focus:ring-red-500"
          : "border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-blue-500"
      }
      `}
            />
            {isPastDate && (
              <p className="text-red-500 text-xs mt-1">
                Дата не может быть в прошлом
              </p>
            )}

            {/* Иконка */}
            <div className="pointer-events-none absolute inset-y-0 top-5 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {isPastDate && (
              <p className="text-red-500 text-xs mt-1">
                Дата не может быть в прошлом
              </p>
            )}
          </div>

          {/* Время */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Время
            </label>
            <input
              type="time"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              className="
                w-full
                px-3
                py-2.5
                pr-8
                border
                border-gray-300
                rounded-lg
                text-gray-700
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                appearance-none
                hover:border-gray-400
                transition
              "
            />
            <div className="pointer-events-none absolute inset-y-0 top-6 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 12l4 1" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 12V7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
