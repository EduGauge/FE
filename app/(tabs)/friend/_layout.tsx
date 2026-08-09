import { Stack } from "expo-router";

import Header from "../../../components/Header";

export default function FriendLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Header title="친구 관리" />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header variant="logo" />,
        }}
      />

      <Stack.Screen name="add" />
      <Stack.Screen name="manage" />
      <Stack.Screen name="addId" />
      <Stack.Screen name="addNickname" />
    </Stack>
  );
}
