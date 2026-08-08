import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FriendAddScreen() {
  const handleAddById = () => {
    router.push("/friend/addId");
  };

  const handleAddByNickname = () => {
    router.push("/friend/addNickname");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Pressable
          onPress={handleAddById}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>
            아이디로 친구 추가
          </Text>
        </Pressable>

        <Pressable
          onPress={handleAddByNickname}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>
            닉네임으로 친구 추가
          </Text>
        </Pressable>
      </View>
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

  buttonGroup: {
    width: "100%",
    paddingHorizontal: 22,
    gap: 17,
  },

  addButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  pressedButton: {
    opacity: 0.8,
  },

  buttonText: {
    color: "#071F30",
    fontSize: 16,
    fontWeight: "700",
  },
});