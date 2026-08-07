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
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType>(
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

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const updateTodo = (todo: Todo) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? todo : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}