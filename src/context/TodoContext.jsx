import React, { createContext, useContext } from "react";
import { useTodos } from "../hooks/useTodos";

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const todoMethods = useTodos();

  return (
    <TodoContext.Provider value={todoMethods}>{children}</TodoContext.Provider>
  );
};
