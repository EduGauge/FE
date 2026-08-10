import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useModal } from "./ModalProvider";

type HeaderProps = {
  title?: string;
  variant?: "back" | "logo";
};

export default function Header({
  title = "",
  variant = "back",
}: HeaderProps) {
  const { openProfile, openNotification } =
    useModal();

  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.safeArea}
    >
      <View style={styles.header}>
        <View style={styles.leftArea}>
          {variant === "logo" ? (
            <Image
              source={require("../assets/logos/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              style={styles.iconButton}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color="#FFFFFF"
              />
            </Pressable>
          )}
        </View>

        {title ? (
          <Text pointerEvents="none" style={styles.title}>
            {title}
          </Text>
        ) : null}

        <View style={styles.rightArea}>
          <Pressable
            onPress={openProfile}
            hitSlop={10}
            style={styles.iconButton}
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
            style={[styles.iconButton, styles.menuButton]}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#071F30",
  },

  header: {
    height: 56,
    backgroundColor: "#071F30",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  leftArea: {
    minWidth: 87,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  logo: {
    width: 87,
    height: 23,
  },

  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  rightArea: {
    minWidth: 87,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  menuButton: {
    marginLeft: 12,
  },
});
