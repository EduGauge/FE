import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type Friend = {
  id: string;
  name: string;
  progress: number;
};

type FriendListProps = {
  friends: Friend[];
  onManageFriend: () => void;
  onWakeFriend?: (friend: Friend) => void;
};

export default function FriendList({
  friends,
  onManageFriend,
  onWakeFriend,
}: FriendListProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleRow}>
        <Text style={styles.title}>친구</Text>

        <Pressable
          onPress={onManageFriend}
          hitSlop={12}
          style={styles.addButton}
        >
          <Ionicons
            name="chevron-forward"
            size={25}
            color="#FFFFFF"
          />
          <View style={styles.redDot} />
        </Pressable>
      </View>

      <View style={styles.list}>
        {friends.map((friend) => (
          <View key={friend.id} style={styles.friendRow}>
            <View
              style={[
                styles.progress,
                {
                  width: `${Math.max(
                    0,
                    Math.min(friend.progress, 100)
                  )}%`,
                },
              ]}
            />

            <View style={styles.avatarContainer}>
              <Image
                source={require("../../assets/characters/profileCharacter.png")}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.friendName}>
              {friend.name}
            </Text>

            <Pressable
              onPress={() => onWakeFriend?.(friend)}
              hitSlop={8}
              style={styles.wakeButton}
            >
              <Text style={styles.wakeText}>깨우기</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
  },

  content: {
    paddingTop: 42,
    paddingHorizontal: 36,
    paddingBottom: 40,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  addButton: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  redDot: {
    position: "absolute",
    top: 1,
    right: 0,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#FF3131",
  },

  list: {
    marginTop: 22,
    gap: 18,
  },

  friendRow: {
    height: 39,
    borderRadius: 20,
    backgroundColor: "#485342",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: "#F5D83F",
  },

  avatarContainer: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: "#F5D83F",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  avatar: {
    width: 28,
    height: 28,
  },

  friendName: {
    flex: 1,
    marginLeft: 12,
    color: "#FFFFFF",
    fontSize: 13,
    zIndex: 1,
  },

  wakeButton: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 14,
    zIndex: 1,
  },

  wakeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});
