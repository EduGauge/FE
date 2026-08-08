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
          onPress={() =>
            router.push("/friend/add")
          }
          hitSlop={12}
          style={styles.addButton}
        >
          <Image
            source={require("../../../assets/icons/plus.png")}
            style={styles.addIcon}
            resizeMode="contain"
          />

          <View style={styles.redDot} />
        </Pressable>
      </View>

      <View style={styles.descriptionContainer}>
        <Image
          source={require("../../../assets/icons/messenger.png")}
          style={styles.messangerIcon}
          resizeMode="contain"
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
    fontSize: 16,
    fontWeight: "500",
  },

  addButton: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  addIcon: {
    width: 18,
    height: 18,
  },

  redDot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#FF3131",
  },

  descriptionContainer: {
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  messangerIcon: {
    width: 12,
    height: 12,
  },

  description: {
    marginLeft: 5,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "400",
  },

  character: {
    width: 76,
    height: 82,
    marginTop: 36,
  },

  emptyText: {
    marginTop: 35,
    color: "#FFFFFF",
    fontSize: 13,
  },
});