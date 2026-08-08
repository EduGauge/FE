import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type NotificationScreenProps = {
  onClose?: () => void;
};

type NotificationItem = {
  id: number;
  message: string;
  canAccept: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    message: "‘피카소’님이 친구 요청을 보냈습니다.",
    canAccept: true,
  },
  {
    id: 2,
    message: "‘HI’님이 친구 요청을 보냈습니다.",
    canAccept: true,
  },
  {
    id: 3,
    message: "일어나세요~ 친구 ‘훈거’님이 깨웠어요.",
    canAccept: false,
  },
];

export default function NotificationScreen({
  onClose,
}: NotificationScreenProps) {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const removeNotification = (id: number) => {
    setNotifications((items) =>
      items.filter((item) => item.id !== id),
    );
  };

  return (
    <View style={styles.overlay}>
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      />

      <View style={styles.sheet}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>알림창</Text>

          <View style={styles.notificationList}>
            {notifications.map((notification) => (
              <View
                key={notification.id}
                style={styles.notificationRow}
              >
                <Text style={styles.message}>
                  {notification.message}
                </Text>

                <View style={styles.actions}>
                  {notification.canAccept && (
                    <Pressable
                      style={styles.acceptButton}
                      onPress={() =>
                        removeNotification(
                          notification.id,
                        )
                      }
                    >
                      <Text style={styles.acceptText}>
                        수락
                      </Text>
                    </Pressable>
                  )}

                  <Pressable
                    hitSlop={10}
                    onPress={() =>
                      removeNotification(
                        notification.id,
                      )
                    }
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color="#2E3033"
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  sheet: {
    height: "88%",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 32,
    color: "#262626",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  notificationList: {
    width: "100%",
  },
  notificationRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  message: {
    flex: 1,
    paddingRight: 10,
    color: "#303236",
    fontSize: 13,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  acceptButton: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#06283D",
  },
  acceptText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
