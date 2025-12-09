import { TodoItem } from "./TodoItem";
import { ClipboardList } from "lucide-react";

export const TodoList = ({ filteredTodos, onToggle, onDelete, onEdit }) => {
  const todoItemActions = {
    onToggle: onToggle,
    onDelete: onDelete,
    onEdit: onEdit,
  };

  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Задачи не найдены
        </h3>
        <p className="text-gray-500">
          Попробуйте изменить фильтры или добавьте новую задачу
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Список задач ({filteredTodos.length})
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...todoItemActions} />
        ))}
      </div>
    </div>
  );
};
