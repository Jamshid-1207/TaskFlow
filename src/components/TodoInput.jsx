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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Приоритет */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Приоритет
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {PRIORITIES.map((pri) => (
                <option key={pri.id} value={pri.id}>
                  {pri.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ответственный */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ответственный
            </label>
            <div className="relative">
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Введите имя"
                list="assignee-list"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="assignee-list">
                {existingAssignees.map((assignee, index) => (
                  <option key={index} value={assignee} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Дедлайн */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дедлайн
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split("T")[0]}
              />
              <input
                type="time"
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                className="w-28 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
