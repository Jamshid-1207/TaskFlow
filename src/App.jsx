import { useState } from "react";
import { TodoProvider, useTodoContext } from "./context/TodoContext";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { FilterPanel } from "./components/FilterPanel";
import { StatsPanel } from "./components/StatsPanel";
import { DeadlineModal } from "./components/DeadlineModal";
import { ListTodo, Bell } from "lucide-react";
import { useTaskFilters } from "./hooks/useTaskFilters";

const TodoAppContent = () => {
  const {
    tasks,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    getOverdueTodos,
    markAsNotified,
  } = useTodoContext();

  const { filters, stats, assignees } = useTaskFilters(tasks);

  const [showStats, setShowStats] = useState(true);
  const overdueTodos = getOverdueTodos();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ListTodo size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Умный ToDo List
              </h1>
              <p className="text-gray-600">
                Организуйте задачи с категориями, приоритетами и дедлайнами
              </p>
            </div>
          </div>

          {overdueTodos.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
              <Bell size={20} className="text-red-600 animate-pulse" />
              <span className="text-red-700 font-medium">
                {overdueTodos.length} просроченных задач
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodoInput onAdd={addTodo} existingAssignees={assignees} />

            <FilterPanel
              filters={filters}
              stats={stats}
              assignees={assignees}
              onClearCompleted={clearCompleted}
            />

            <TodoList
              filteredTodos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>

          <div className="space-y-6">
            <div className="sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Аналитика
                </h2>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  {showStats ? "Скрыть" : "Показать"}
                </button>
              </div>

              {showStats && <StatsPanel stats={stats} />}
            </div>
          </div>
        </div>
      </div>

      <DeadlineModal
        overdueTodos={overdueTodos}
        onMarkAsNotified={markAsNotified}
        onToggleTodo={toggleTodo}
      />
    </div>
  );
};

const App = () => (
  <TodoProvider>
    <TodoAppContent />
  </TodoProvider>
);

export default App;
