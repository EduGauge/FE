import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,

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

        headerLeftContainerStyle: {
          paddingLeft: 12,
        },

        headerRightContainerStyle: {
          paddingRight: 16,
        },

        tabBarActiveTintColor: "#F5CE3E",
        tabBarInactiveTintColor: "#FFFFFF",

        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "#071F30",
          borderTopWidth: 1,
          borderTopColor: "#183849",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },

        sceneStyle: {
          backgroundColor: "#071F30",
        },
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: "달력",
          headerTitle: "달력",
          tabBarLabel: "달력",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? "calendar"
                  : "calendar-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: "리스트",
          headerTitle: "리스트",
          tabBarLabel: "리스트",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="friend"
        options={{
          title: "친구",
          tabBarLabel: "친구",

          // friend/_layout.tsx에서 헤더를 관리하므로
          // Tabs의 헤더는 끈다.
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "people" : "people-outline"
              }
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeftButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginLeft: 12,
  },
});