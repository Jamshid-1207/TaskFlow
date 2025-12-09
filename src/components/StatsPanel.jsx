import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  PieChart,
} from "lucide-react";
import { CATEGORIES, PRIORITIES } from "../utils/constants";

export const StatsPanel = ({ stats }) => {
  const progressPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={24} className="text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">Статистика</h2>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-6">
        {/* Всего задач */}
        <div className="bg-blue-50 rounded-lg p-2 flex flex-wrap justify-between items-center w-full">
          <span className="text-gray-700 text-sm font-medium">Всего задач</span>

          <span className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md font-semibold">
            {stats.total}
          </span>
        </div>

        {/* Выполнено */}
        <div className="bg-green-50 rounded-lg p-2 flex flex-wrap justify-between items-center w-full">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
              Выполнено
            </span>
            <CheckCircle size={18} className="text-green-600" />
          </div>

          <span className="px-2 py-1 text-sm bg-green-600 text-white rounded-md font-semibold">
            {stats.completed || "0"}
          </span>
        </div>

        {/* Активные */}
        <div className="bg-yellow-50 rounded-lg p-2 flex flex-wrap justify-between items-center w-full">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
              Активные
            </span>
            <Clock size={18} className="text-yellow-600" />
          </div>

          <span className="px-2 py-1 text-sm bg-yellow-600 text-white rounded-md font-semibold">
            {stats.active}
          </span>
        </div>

        {/* Просрочено */}
        <div className="bg-red-50 rounded-lg p-2 flex flex-wrap justify-between items-center w-full">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
              Просрочено
            </span>
            <AlertCircle size={18} className="text-red-600" />
          </div>

          <span className="px-2 py-1 text-sm bg-red-600 text-white rounded-md font-semibold">
            {stats.overdue}
          </span>
        </div>
      </div>

      {/* Прогресс выполнения */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Прогресс выполнения
          </span>
          <span className="text-sm font-bold text-blue-600">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Статистика по категориям */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Категории */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={18} className="text-purple-500" />
            <h3 className="font-medium text-gray-800">По категориям</h3>
          </div>
          <div className="space-y-3">
            {stats.byCategory.map((item) => {
              if (item.count === 0) return null;

              const category = CATEGORIES.find((c) => c.name === item.name);
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2">
                  {/* Левый текст */}
                  <div className="flex items-center gap-1 min-w-0">
                    <span
                      style={{ color: category?.color }}
                      className="whitespace-nowrap text-sm font-medium">
                      {item.name.split(" ")[0]}
                    </span>
                    <span className="text-sm text-gray-700 whitespace-nowrap">
                      {item.name.split(" ")[1]}
                    </span>
                  </div>

                  {/* Progress + число */}
                  <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                    <div className="bg-gray-200 rounded-full h-2 flex-1 max-w-[100px]">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(item.count / stats.total) * 100}%`,
                          backgroundColor: category?.color,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-8 text-right whitespace-nowrap">
                      {item.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Приоритеты */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-orange-500" />
            <h3 className="font-medium text-gray-800">По приоритетам</h3>
          </div>
          <div className="space-y-3">
            {stats.byPriority.map((item) => {
              if (item.count === 0) return null;

              const priority = PRIORITIES.find((p) => p.name === item.name);
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2">
                  {/* Левый текст */}
                  <div className="flex items-center gap-1 min-w-0">
                    <span
                      style={{ color: priority?.color }}
                      className="whitespace-nowrap text-sm font-medium">
                      {item.name.split(" ")[0]}
                    </span>
                    <span className="text-sm text-gray-700 whitespace-nowrap">
                      {item.name.split(" ")[1]}
                    </span>
                  </div>

                  {/* Progress + число */}
                  <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                    <div className="bg-gray-200 rounded-full h-2 flex-1 max-w-[100px]">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(item.count / stats.total) * 100}%`,
                          backgroundColor: priority?.color,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-8 text-right whitespace-nowrap">
                      {item.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
