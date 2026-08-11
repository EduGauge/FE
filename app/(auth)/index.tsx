import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AuthIndex() {
  return (
    <View style={styles.container}>
      <View style={styles.characterArea}>
        <Image
          source={require("../../assets/characters/emoji_intro_2.png")}
          style={styles.character}
          resizeMode="contain"
        />

        <Image
          source={require("../../assets/logos/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            router.push("/(auth)/signup")
          }
        >
          <Text style={styles.smallText}>
            에듀게이지가 처음이신가요?
          </Text>

          <Text style={styles.buttonText}>
            회원가입하기
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() =>
            router.push("/(auth)/login")
          }
        >
          <Text style={styles.smallText}>
            이미 계정이 있다면,
          </Text>

          <Text style={styles.buttonText}>
            로그인하기
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
  },

  characterArea: {
    alignItems: "center",
    paddingTop: 205,
  },

  character: {
    width: 115,
    height: 115,
  },

  logo: {
    width: 180,
    height: 55,
    marginTop: 12,
  },

  buttonContainer: {
    position: "absolute",
    left: 19,
    right: 19,
    bottom: 32,
  },

  button: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },

  smallText: {
    color: "#10243A",
    fontSize: 9,
    fontWeight: "400",
    marginBottom: 2,
  },

  buttonText: {
    color: "#10243A",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 17,
  },
});