import { router } from "expo-router";

import EmptyListView from "../../../components/list/EmptyListView";
import ListView from "../../../components/list/ListView";
import { useTodos } from "../../../context/TodoContext";

export default function ListScreen() {
  const {
    todos,
    updateTodo,
    elapsedSeconds,
    setIsTimerRunning,
  } = useTodos();

  const handleToggleTodo = (id: string) => {
    const todo = todos.find((item) => item.id === id);

    if (todo) {
      updateTodo({ ...todo, checked: !todo.checked });
    }
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    router.push("/timer");
  };

  if (todos.length > 0) {
    return (
      <ListView
        todos={todos}
        elapsedSeconds={elapsedSeconds}
        onToggleTodo={handleToggleTodo}
        onStartTimer={handleStartTimer}
      />
    );
  }

  return (
    <EmptyListView
      elapsedSeconds={elapsedSeconds}
      onAddList={() => router.push("/list/addList")}
    />
  );
}
