import React, { createContext, useContext, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  categoryId: string;
  checked: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  deleteTodosByCategory: (categoryId: string) => void;
  elapsedSeconds: number;
  isTimerRunning: boolean;
  setElapsedSeconds: (seconds: number) => void;
  setIsTimerRunning: (running: boolean) => void;
  resetTimer: () => void;
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "경제학 과제", categoryId: "study", checked: false },
    { id: "2", title: "영어 단어 외우기", categoryId: "study", checked: false },
    { id: "3", title: "러닝 30분", categoryId: "exercise", checked: false },
  ]);

  const addTodo = (todo: Todo) => setTodos((current) => [...current, todo]);
  const updateTodo = (todo: Todo) =>
    setTodos((current) =>
      current.map((item) => (item.id === todo.id ? todo : item))
    );
  const deleteTodo = (id: string) =>
    setTodos((current) => current.filter((item) => item.id !== id));
  const deleteTodosByCategory = (categoryId: string) =>
    setTodos((current) =>
      current.filter((item) => item.categoryId !== categoryId)
    );

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const resetTimer = () => {
    setElapsedSeconds(0);
    setIsTimerRunning(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        deleteTodosByCategory,
        elapsedSeconds,
        isTimerRunning,
        setElapsedSeconds,
        setIsTimerRunning,
        resetTimer,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
