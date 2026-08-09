import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useModal } from "../../../components/ModalProvider";

export default function FriendLayout() {
  const { openProfile, openNotification } =
    useModal();

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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerBackVisible: false,
          headerLeft: () => (
            <Image
              source={require("../../../assets/logos/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          title: "친구 관리",
        }}
      />

      <Stack.Screen
        name="manage"
        options={{
          title: "친구 관리",
        }}
      />

      <Stack.Screen
        name="addId"
        options={{
          title: "친구 관리",
        }}
      />

      <Stack.Screen
        name="addNickname"
        options={{
          title: "친구 관리",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 87,
    height: 23,
    marginLeft: 17,
  },

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
