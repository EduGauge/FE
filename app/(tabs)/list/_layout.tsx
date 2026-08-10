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
        name="addCategory"
        options={{
          header: () => <Header title="카테고리" />,
        }}
      />

      <Stack.Screen
        name="manage"
        options={{
          header: () => <Header title="리스트 관리" />,
        }}
      />
    </Stack>
  );
}
