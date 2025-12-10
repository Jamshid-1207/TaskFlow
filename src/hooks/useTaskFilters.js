import { useState, useMemo } from "react";
import { CATEGORIES, PRIORITIES } from "../utils/constants";

export function useTaskFilters(tasks = []) {
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const assignees = useMemo(() => {
    return [...new Set(tasks.map((t) => t.assignedTo).filter(Boolean))];
  }, [tasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const active = tasks.filter((t) => !t.completed).length;
    const overdue = tasks.filter(
      (t) => t.deadline && !t.completed && new Date(t.deadline) < new Date()
    ).length;

    const total = tasks.length;

    const byCategory = CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      count: tasks.filter((t) => t.category === c.id).length,
    }));

    const byPriority = PRIORITIES.map((p) => ({
      id: p.id,
      name: p.name,
      count: tasks.filter((t) => t.priority === p.id).length,
    }));

    return { total, completed, active, overdue, byCategory, byPriority };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => (filter === "all" ? true : t.status === filter))
      .filter((t) =>
        priorityFilter === "all" ? true : t.priority === priorityFilter
      )
      .filter((t) =>
        categoryFilter === "all" ? true : t.category === categoryFilter
      )
      .filter((t) =>
        assignedFilter === "all" ? true : t.assignedTo === assignedFilter
      )
      .filter((t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [
    tasks,
    filter,
    priorityFilter,
    categoryFilter,
    assignedFilter,
    searchQuery,
  ]);

  return {
    filteredTasks,
    assignees,
    stats,
    filters: {
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
    },
  };
}
