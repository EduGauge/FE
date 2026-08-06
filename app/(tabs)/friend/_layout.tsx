import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function FriendLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#071F30",
        },

        headerShadowVisible: false,
        headerTitleAlign: "center",

        headerTitleStyle: {
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "600",
        },

        headerLeft: () => (
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={styles.headerLeftButton}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>
        ),

        headerRight: () => (
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => router.push("/mypage")}
              hitSlop={10}
            >
              <Ionicons
                name="person-circle"
                size={28}
                color="#FFFFFF"
              />
            </Pressable>

            <Pressable
              onPress={() =>
                router.push("/notification")
              }
              hitSlop={10}
              style={styles.menuButton}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "친구",
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          title: "친구 관리",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerLeftButton: {
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  headerRight: {
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginLeft: 12,
  },
});