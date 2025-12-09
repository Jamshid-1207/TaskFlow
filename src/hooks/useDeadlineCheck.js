import { useEffect, useCallback, useRef, useMemo } from "react";
import { isOverdue } from "../utils/helpers";

export const useDeadlineCheck = (todos, markAsNotified) => {
  const timeoutRefs = useRef({});
  const lastCheckRef = useRef(0);

  const checkDeadlines = useCallback(() => {
    const now = Date.now();

    if (now - lastCheckRef.current < 30000) return;
    lastCheckRef.current = now;

    todos.forEach((todo) => {
      const { id, completed, deadline, notified } = todo;

      if (timeoutRefs.current[id]) return;

      if (!completed && deadline && isOverdue(deadline) && !notified) {
        timeoutRefs.current[id] = setTimeout(() => {
          markAsNotified(id);
          delete timeoutRefs.current[id];
        }, 1000);
      }
    });
  }, [todos, markAsNotified]);

  useEffect(() => {
    checkDeadlines();

    const intervalId = setInterval(checkDeadlines, 60000);

    return () => {
      clearInterval(intervalId);
      Object.values(timeoutRefs.current).forEach(clearTimeout);
      timeoutRefs.current = {};
    };
  }, [checkDeadlines]);

  const getOverdueTodos = useMemo(() => {
    return todos.filter(
      (todo) =>
        !todo.completed &&
        todo.deadline &&
        isOverdue(todo.deadline) &&
        !todo.notified
    );
  }, [todos]);

  return { getOverdueTodos };
};
