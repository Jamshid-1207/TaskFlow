import { useState } from "react";
import { Check, Trash2, Edit2, Calendar, User, Save, X } from "lucide-react";
import { PriorityBadge } from "./PriorityBadge";
import { getCategoryName, formatDate } from "../utils/helpers";

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editAssignedTo, setEditAssignedTo] = useState(todo.assignedTo);

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, {
        text: editText.trim(),
        assignedTo: editAssignedTo.trim() || "Не назначено",
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setEditAssignedTo(todo.assignedTo);
    setIsEditing(false);
  };

  const getDeadlineClass = () => {
    if (!todo.deadline) return "";
    const now = new Date();
    const deadline = new Date(todo.deadline);

    if (deadline < now && !todo.completed) {
      return "text-red-600 font-semibold";
    }

    if (deadline.toDateString() === now.toDateString()) {
      return "text-orange-600 font-semibold";
    }

    return "text-gray-600";
  };

  return (
    <div
      className={`
      flex items-start justify-between p-4 rounded-lg mb-3 transition-all
      ${
        todo.completed
          ? "bg-gray-50 border border-gray-200"
          : "bg-white border border-gray-200 hover:bg-gray-50"
      }
      ${
        !todo.completed && todo.deadline && new Date(todo.deadline) < new Date()
          ? "border-red-200 bg-red-50"
          : ""
      }
    `}>
      {/* Чекбокс и контент */}
      <div className="flex items-start gap-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-colors mt-1 flex-shrink-0
            ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-green-500 hover:bg-green-50"
            }
          `}>
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={editAssignedTo}
                  onChange={(e) => setEditAssignedTo(e.target.value)}
                  placeholder="Ответственный"
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm">
                  <Save size={14} />
                  Сохранить
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm">
                  <X size={14} />
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Текст задачи */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-base ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}>
                  {todo.text}
                </span>
                <PriorityBadge priority={todo.priority} />
              </div>

              {/* Мета-информация */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                {/* Категория */}
                <span className="flex items-center gap-1">
                  <span className="text-gray-400">
                    {getCategoryName(todo.category).split(" ")[0]}{" "}
                    {/* Эмодзи категории */}
                  </span>
                  <span>{getCategoryName(todo.category).split(" ")[1]}</span>
                </span>

                {/* Ответственный */}
                <span className="flex items-center gap-1">
                  <User size={14} className="text-gray-400" />
                  {todo.assignedTo}
                </span>

                {/* Дедлайн */}
                {todo.deadline && (
                  <span
                    className={`flex items-center gap-1 ${getDeadlineClass()}`}>
                    <Calendar
                      size={14}
                      className={
                        todo.deadline &&
                        new Date(todo.deadline) < new Date() &&
                        !todo.completed
                          ? "text-red-500"
                          : "text-gray-400"
                      }
                    />
                    {formatDate(todo.deadline)}
                  </span>
                )}

                {/* Дата создания */}
                <span className="text-gray-400 text-xs">
                  {new Date(todo.createdAt).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Кнопки действий (если не в режиме редактирования) */}
      {!isEditing && (
        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Редактировать">
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Удалить">
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
