import { Filter, Search, Trash2 } from "lucide-react";
import { STATUS_OPTIONS, CATEGORIES, PRIORITIES } from "../utils/constants";
/**
 * Универсальная группа кнопок фильтра
 */
const FilterButtonGroup = ({
  options,
  selected,
  onSelect,
  getLabel,
  getStyle,
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => (
      <button
        key={option.id}
        type="button"
        onClick={() => onSelect(option.id)}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          selected === option.id
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        style={selected === option.id && getStyle ? getStyle(option) : {}}
        aria-pressed={selected === option.id}>
        {getLabel(option)}
      </button>
    ))}
  </div>
);

/**

* Универсальный select-фильтр
  */
const SelectFilter = ({ id, label, value, onChange, options, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          appearance-none
          px-3
          py-2.5
          border
          border-gray-300
          rounded-lg
          bg-white
          text-sm
          text-gray-700
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          hover:border-gray-400
          transition
        ">
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id || option} value={option.id || option}>
            {option.name || option}
          </option>
        ))}
      </select>
      {/* Кастомная стрелка */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
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
  </div>
);

export const FilterPanel = ({
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
  onClearCompleted,
  stats,
}) => {
  const assignees = getAssignees();
  const hasOverdueTasks = stats.overdue > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Заголовок и статистика */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Фильтры и поиск
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{stats.active}</span> активных,
            <span className="font-semibold text-green-600 ml-2">
              {stats.completed}
            </span>
            выполненных
            {hasOverdueTasks && (
              <>
                <span className="font-semibold text-red-600 ml-2">
                  {stats.overdue}
                </span>
                <span className="text-red-600 ml-2">просрочено</span>
              </>
            )}
          </div>

          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap"
              aria-label="Очистить выполненные задачи">
              <Trash2 size={14} aria-hidden="true" />
              Очистить выполненные
            </button>
          )}
        </div>
      </div>
      {/* Поиск */}
      <div className="mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск задач..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Поиск задач"
          />
        </div>
      </div>
      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Статус */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Статус
          </label>
          <FilterButtonGroup
            options={STATUS_OPTIONS}
            selected={filter}
            onSelect={setFilter}
            getLabel={(o) => o.label}
          />
        </div>

        {/* Приоритет */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Приоритет
          </label>
          <FilterButtonGroup
            options={[{ id: "all", name: "Все" }, ...PRIORITIES]}
            selected={priorityFilter}
            onSelect={setPriorityFilter}
            getLabel={(p) => p.name.split(" ")[1] || p.name}
            getStyle={(p) =>
              p.color ? { backgroundColor: p.color, borderColor: p.color } : {}
            }
          />
        </div>

        {/* Категория */}
        <SelectFilter
          id="category-filter"
          label="Категория"
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={CATEGORIES}
          placeholder="Все категории"
        />

        {/* Ответственный */}
        <SelectFilter
          id="assigned-filter"
          label="Ответственный"
          value={assignedFilter}
          onChange={setAssignedFilter}
          options={assignees}
          placeholder="Все"
        />
      </div>
    </div>
  );
};
