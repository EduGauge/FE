import { Stack } from "expo-router";

import Header from "../../../components/Header";

export default function ListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header variant="logo" />,
        }}
      />

      <Stack.Screen
        name="addList"
        options={{
          header: () => <Header title="리스트" />,
        }}
      />
    </Stack>
  );
}
