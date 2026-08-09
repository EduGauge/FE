import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const friends = [
  { id: "2", name: "친구 2", progress: 70 },
  { id: "3", name: "친구 3", progress: 100 },
  { id: "4", name: "친구 4", progress: 100 },
  { id: "5", name: "친구 5", progress: 100 },
  { id: "6", name: "친구 6", progress: 100 },
  { id: "7", name: "친구 7", progress: 100 },
  { id: "8", name: "친구 8", progress: 42 },
  { id: "9", name: "친구 9", progress: 74 },
];

export default function FriendManageScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>친구 추가</Text>

      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => router.push("/friend/addId")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            아이디로 친구 추가
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/friend/addNickname")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>
            닉네임으로 친구 추가
          </Text>
        </Pressable>
      </View>

      <Text style={styles.friendTitle}>친구</Text>

      <View style={styles.list}>
        {friends.map((friend) => (
          <Pressable
            key={friend.id}
            style={styles.friendRow}
          >
            <View
              style={[
                styles.progress,
                { width: `${friend.progress}%` },
              ]}
            />

            <View style={styles.avatarContainer}>
              <Image
                source={require("../../../assets/characters/profileCharacter.png")}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.friendName}>
              {friend.name}
            </Text>
          </Pressable>
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
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 36,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 4,
    marginBottom: 18,
  },

  buttonGroup: {
    gap: 14,
  },

  addButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#071F30",
    fontSize: 15,
    fontWeight: "700",
  },

  friendTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 22,
    marginLeft: 4,
  },

  list: {
    marginTop: 16,
    gap: 16,
    paddingHorizontal: 20,
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
    top: 0,
    bottom: 0,
    left: 0,
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
    marginLeft: 12,
    color: "#071F30",
    fontSize: 13,
    fontWeight: "500",
    zIndex: 1,
  },
});
