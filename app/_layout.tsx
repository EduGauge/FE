import { Stack } from "expo-router";

import { CategoryProvider } from "./context/CategoryContext";
import { TodoProvider } from "./context/TodoContext";

export default function RootLayout() {
  return (
    <TodoProvider>

      <CategoryProvider>

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />

      </CategoryProvider>

    </TodoProvider>
  );
}