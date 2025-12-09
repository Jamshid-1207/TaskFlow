import { CATEGORIES, PRIORITIES } from "./constants";

// Генерация ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Форматирование даты
export const formatDate = (date) => {
  if (!date) return "Без срока";

  const now = new Date();
  const taskDate = new Date(date);

  // Сегодня
  if (taskDate.toDateString() === now.toDateString()) {
    return `Сегодня, ${taskDate.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Завтра
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (taskDate.toDateString() === tomorrow.toDateString()) {
    return `Завтра, ${taskDate.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Просрочено
  if (taskDate < now) {
    return `🔴 Просрочено: ${taskDate.toLocaleDateString("ru-RU")}`;
  }

  // Будущая дата
  return taskDate.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Проверка дедлайна
export const isOverdue = (deadline) => {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
};

// Получение цвета приоритета
export const getPriorityColor = (priority) => {
  const priorityObj = PRIORITIES.find((p) => p.id === priority);
  return priorityObj ? priorityObj.color : "#6b7280";
};

// Получение названия категории
export const getCategoryName = (categoryId) => {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  return category ? category.name : "Неизвестно";
};
