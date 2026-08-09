import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import { router, Tabs } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useModal } from "../../components/ModalProvider";
=======
import { Tabs } from "expo-router";
>>>>>>> 4a9915e (feat: 캘린더 탭 수정중)

export default function TabLayout() {
  const { openProfile, openNotification } =
    useModal();

  return (
    <Tabs
      screenOptions={{
<<<<<<< HEAD
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
              onPress={openProfile}
              hitSlop={10}
            >
              <Ionicons
                name="person-circle"
                size={28}
                color="#FFFFFF"
              />
            </Pressable>

            <Pressable
              onPress={openNotification}
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
=======
        headerShown: false,
>>>>>>> 4a9915e (feat: 캘린더 탭 수정중)

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
          tabBarLabel: "달력",

          tabBarIcon: ({
            color,
            focused,
          }) => (
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
          tabBarLabel: "리스트",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "list"
                  : "list-outline"
              }
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

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "people"
                  : "people-outline"
              }
              size={24}
              color={color}
            />
          ),
          
          // 친구 화면의 헤더는
          // friend/_layout.tsx에서 관리
          headerShown: false,
        }}
      />
    </Tabs>
  );
<<<<<<< HEAD
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
=======
}
>>>>>>> 4a9915e (feat: 캘린더 탭 수정중)
