import { useLineModal } from "../hooks/useLineModal";
import { X, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { formatDate } from "../utils/helpers";

export const DeadlineModal = ({
  overdueTodos,
  onMarkAsNotified,
  onToggleTodo,
}) => {
  const { isOpen, visibleTodos, handleClose, handleCompleteTask } =
    useLineModal({
      overdueTodos,
      onMarkAsNotified,
      onToggleTodo,
    });

  if (!isOpen || visibleTodos.length === 0) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Просроченные задачи
                </h2>
                <p className="text-sm text-gray-600">
                  {visibleTodos.length}{" "}
                  {visibleTodos.length === 1 ? "задача" : "задачи"} требуют
                  внимания
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {visibleTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {todo.text}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-red-500" />
                          <span className="text-red-600 font-medium">
                            Дедлайн: {formatDate(todo.deadline)}
                          </span>
                        </span>

                        <span className="text-gray-500">
                          Ответственный: {todo.assignedTo}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCompleteTask(todo.id)}
                      className="ml-3 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium whitespace-nowrap">
                      <CheckCircle size={16} />
                      Выполнить
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => onMarkAsNotified(todo.id)}
                      className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
                      Отложить напоминание
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Задачи будут скрыты после отметки как уведомленные
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    visibleTodos.forEach((todo) => handleCompleteTask(todo.id));
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium">
                  Выполнить все ({visibleTodos.length})
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
