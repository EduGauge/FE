import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FriendScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          친구
        </Text>

        <Pressable
          onPress={() => router.push("/friend/add")}
          hitSlop={12}
          style={styles.addButton}
        >
          <MaterialIcons
            name="add"
            size={28}
            color="#FFFFFF"
          />

          <View style={styles.redDot} />
        </Pressable>
      </View>

      <View style={styles.descriptionContainer}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={13}
          color="#FFFFFF"
        />

        <Text style={styles.description}>
          친구를 추가해보아요!
        </Text>
      </View>

      <Image
        source={require(
          "../../../assets/characters/character1.png"
        )}
        style={styles.character}
        resizeMode="contain"
      />

      <Text style={styles.emptyText}>
        추가된 친구가 없습니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  addButton: {
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  redDot: {
    position: "absolute",
    top: 2,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF3131",
  },

  descriptionContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  description: {
    marginLeft: 4,
    color: "#FFFFFF",
    fontSize: 12,
  },

  character: {
    width: 120,
    height: 120,
    marginTop: 40,
  },

  emptyText: {
    marginTop: 28,
    color: "#FFFFFF",
    fontSize: 16,
  },
});