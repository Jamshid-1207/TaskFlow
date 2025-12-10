import { useMemo } from "react";
import { useCallback, useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { generateId, isOverdue } from "../utils/helpers";
import { useDeadlineCheck } from "./useDeadlineCheck";
import { CATEGORIES, PRIORITIES, INITIAL_ASSIGNEES } from "../utils/constants";

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addTodo = useCallback(
    (text, category, priority, assignedTo, deadline) => {
      const newTodo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
        category,
        priority,
        assignedTo: assignedTo.trim() || "Не назначено",
        deadline: deadline ? new Date(deadline) : null,
        notified: false,
      };
      setTodos((prev) => [newTodo, ...prev]);
    },
    [setTodos]
  );
  const deleteTodo = useCallback(
    (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const editTodo = useCallback(
    (id, updates) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  const getAssignees = useCallback(() => {
    const assignees = todos.map((todo) => todo.assignedTo);
    const uniqueAssignees = [...new Set(assignees)];
    return [...INITIAL_ASSIGNEES, ...uniqueAssignees];
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active" && todo.completed) return false;
      if (filter === "completed" && !todo.completed) return false;
      if (priorityFilter !== "all" && todo.priority !== priorityFilter)
        return false;
      if (categoryFilter !== "all" && todo.category !== categoryFilter)
        return false;
      if (assignedFilter !== "all" && todo.assignedTo !== assignedFilter)
        return false;
      if (
        searchQuery &&
        !todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [
    todos,
    filter,
    priorityFilter,
    categoryFilter,
    assignedFilter,
    searchQuery,
  ]);

  const getOverdueTodos = useCallback(() => {
    return todos.filter(
      (todo) =>
        !todo.completed &&
        todo.deadline &&
        isOverdue(todo.deadline) &&
        !todo.notified
    );
  }, [todos]);

  const markAsNotified = useCallback(
    (id) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, notified: true } : todo
        )
      );
    },
    [setTodos]
  );

  useDeadlineCheck(todos, markAsNotified);

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
    overdue: todos.filter(
      (todo) => !todo.completed && todo.deadline && isOverdue(todo.deadline)
    ).length,
    byCategory: CATEGORIES.map((cat) => ({
      name: cat.name,
      count: todos.filter((todo) => todo.category === cat.id).length,
    })),
    byPriority: PRIORITIES.map((pri) => ({
      name: pri.name,
      count: todos.filter((todo) => todo.priority === pri.id).length,
    })),
  };

  return {
    todos,
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
  };
};
