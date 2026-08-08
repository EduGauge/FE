import React, {
  createContext,
  useContext,
  useState,
} from "react";

export interface Todo {
  id: string;
  title: string;
  category: string;
  repeat: string;
  repeatEnd: string;
  checked: boolean;
}

interface TodoContextType {
  // 리스트
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;

  // 타이머
  elapsedSeconds: number;
  isTimerRunning: boolean;

  setElapsedSeconds: (
    seconds: number
  ) => void;

  setIsTimerRunning: (
    running: boolean
  ) => void;

  resetTimer: () => void;
}

const TodoContext =
  createContext<TodoContextType>(
    {} as TodoContextType
  );

export function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "경제학 과제",
      category: "학업",
      repeat: "매일",
      repeatEnd: "없음",
      checked: false,
    },
    {
      id: "2",
      title: "영어 단어 암기",
      category: "학업",
      repeat: "매일",
      repeatEnd: "없음",
      checked: false,
    },
    {
      id: "3",
      title: "러닝 30분",
      category: "운동",
      repeat: "매일",
      repeatEnd: "없음",
      checked: false,
    },
  ]);

  // -------------------------
  // 리스트 CRUD
  // -------------------------

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [
      ...prev,
      todo,
    ]);
  };

  const updateTodo = (todo: Todo) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id
          ? todo
          : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // -------------------------
  // 타이머 상태
  // -------------------------

  const [
    elapsedSeconds,
    setElapsedSeconds,
  ] = useState(0);

  const [
    isTimerRunning,
    setIsTimerRunning,
  ] = useState(false);

  // 타이머 초기화
  const resetTimer = () => {
    setElapsedSeconds(0);
    setIsTimerRunning(false);
  };

  return (
    <TodoContext.Provider
      value={{
        // 리스트
        todos,
        addTodo,
        updateTodo,
        deleteTodo,

        // 타이머
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