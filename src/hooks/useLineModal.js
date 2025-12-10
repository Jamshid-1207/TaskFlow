import { useState, useEffect } from "react";

export function useLineModal({ overdueTodos, onMarkAsNotified, onToggleTodo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    if (overdueTodos.length > 0) {
      setVisibleTodos(overdueTodos);
      setIsOpen(true);
    }
  }, [overdueTodos]);

  const handleClose = () => {
    visibleTodos.forEach((todo) => {
      onMarkAsNotified(todo.id);
    });
    setIsOpen(false);
  };

  const handleCompleteTask = (todoId) => {
    const remainingTodos = visibleTodos.filter((todo) => todo.id !== todoId);
    onToggleTodo(todoId);
    setVisibleTodos(remainingTodos);

    if (remainingTodos.length === 0) {
      handleClose();
    }
  };

  return {
    isOpen,
    visibleTodos,
    handleClose,
    handleCompleteTask,
    setIsOpen,
  };
}
