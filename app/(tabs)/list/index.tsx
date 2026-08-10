import { router } from "expo-router";

import EmptyListView from "../../../components/list/EmptyListView";
import ListView from "../../../components/list/ListView";
import { useTodos } from "../../../context/TodoContext";
import { useCategories } from "../../../context/CategoryContext";

export default function ListScreen() {
  const { categories } = useCategories();
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

  if (categories.length > 0) {
    return (
      <ListView
        todos={todos}
        categories={categories}
        elapsedSeconds={elapsedSeconds}
        onToggleTodo={handleToggleTodo}
        onStartTimer={handleStartTimer}
        onManageList={() => router.push("/list/manage")}
      />
    );
  }

  return (
    <EmptyListView
      elapsedSeconds={elapsedSeconds}
      onAddCategory={() => router.push("/list/addCategory")}
    />
  );
}
