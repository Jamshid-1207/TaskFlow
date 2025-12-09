import { useState } from "react";
import { TodoProvider, useTodoContext } from "./context/TodoContext";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { FilterPanel } from "./components/FilterPanel";
import { StatsPanel } from "./components/StatsPanel";
import { DeadlineModal } from "./components/DeadlineModal";
import { ListTodo, Bell } from "lucide-react";

// Главный компонент приложения
const TodoAppContent = () => {
  const {
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    assignedFilter,
    setAssignedFilter,
    searchQuery,
    setSearchQuery,
    getAssignees,
    getOverdueTodos,
    markAsNotified,
    stats,
  } = useTodoContext();

  const FilterPanelProps = {
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    assignedFilter,
    setAssignedFilter,
    searchQuery,
    setSearchQuery,
    getAssignees,
    getAssignees,
    onClearCompleted: clearCompleted,
    stats,
  };

  const todoListProps = {
    filteredTodos,
    onToggle: toggleTodo,
    onDelete: deleteTodo,
    onEdit: editTodo,
  };

  const [showStats, setShowStats] = useState(true);
  const overdueTodos = getOverdueTodos();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Заголовок */}
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

          {/* Уведомление о просроченных */}
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
        {/* Основная сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - форма и фильтры */}
          <div className="lg:col-span-2 space-y-6">
            <TodoInput onAdd={addTodo} existingAssignees={getAssignees()} />

            <FilterPanel {...FilterPanelProps} />

            <TodoList {...todoListProps} />
          </div>

          {/* Правая колонка - статистика */}
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

              {/* Быстрые действия */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-800 mb-4">
                  Быстрые действия
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setFilter("active");
                      setPriorityFilter("all");
                      setCategoryFilter("all");
                      setAssignedFilter("all");
                      setSearchQuery("");
                    }}
                    className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-left font-medium">
                    Показать только активные задачи
                  </button>

                  <button
                    onClick={() => {
                      setFilter("all");
                      setPriorityFilter("high");
                    }}
                    className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-left font-medium">
                    Показать задачи высокого приоритета
                  </button>

                  <button
                    onClick={() => {
                      const now = new Date();
                      const today = now.toISOString().split("T")[0];

                      const dateInput =
                        document.querySelector('input[type="date"]');

                      if (dateInput) {
                        dateInput.value = today;
                        dateInput.dispatchEvent(
                          new Event("input", { bubbles: true })
                        );
                        dateInput.dispatchEvent(
                          new Event("change", { bubbles: true })
                        );
                      }
                    }}
                    className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-left font-medium">
                    Установить дедлайн на сегодня
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Всего задач: {stats.total} | Выполнено: {stats.completed} |
            Активные: {stats.active}
          </p>
          <p className="mt-1">Данные сохраняются в вашем браузере</p>
        </footer>
      </div>

      {/* Модалка с уведомлениями */}
      <DeadlineModal
        overdueTodos={overdueTodos}
        onMarkAsNotified={markAsNotified}
        onToggleTodo={toggleTodo}
      />
    </div>
  );
};

// Обертка приложения с провайдером
const App = () => {
  return (
    <TodoProvider>
      <TodoAppContent />
    </TodoProvider>
  );
};

export default App;
