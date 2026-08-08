import { Stack } from "expo-router";

import { ModalProvider } from "../components/ModalProvider";
import { CategoryProvider } from "../context/CategoryContext";
import { TodoProvider } from "../context/TodoContext";

export default function RootLayout() {
  return (
    <TodoProvider>
      <CategoryProvider>
        <ModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ModalProvider>
      </CategoryProvider>
    </TodoProvider>
  );
}
