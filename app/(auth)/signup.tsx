import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Signup() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(auth)")}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          회원가입
        </Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../assets/characters/emoji_intro_3.png")}
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
            router.push("/(auth)/signup-email")
          }
        >
          <View style={styles.buttonContent}>
            <View style={styles.emailIcon}>
              <Ionicons
                name="mail-outline"
                size={19}
                color="#10243A"
              />
            </View>

            <Text style={styles.buttonText}>
              이메일로 회원가입
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() =>
            console.log("Google Signup")
          }
        >
          <View style={styles.buttonContent}>
            <Image
              source={require("../../assets/logos/logo_google.png")}
              style={styles.socialLogo}
              resizeMode="contain"
            />

            <Text style={styles.buttonText}>
              구글로 회원가입
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() =>
            console.log("Kakao Signup")
          }
        >
          <View style={styles.buttonContent}>
            <Image
              source={require("../../assets/logos/logo_kakao.png")}
              style={styles.socialLogo}
              resizeMode="contain"
            />

            <Text style={styles.buttonText}>
              카카오톡으로 회원가입
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() =>
            console.log("Naver Signup")
          }
        >
          <View style={styles.buttonContent}>
            <Image
              source={require("../../assets/logos/logo_naver.png")}
              style={styles.socialLogo}
              resizeMode="contain"
            />

            <Text style={styles.buttonText}>
              네이버로 회원가입
            </Text>
          </View>
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

  header: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 17,
    bottom: 18,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  content: {
    alignItems: "center",
    marginTop: 80,
  },

  character: {
    width: 110,
    height: 110,
  },

  logo: {
    width: 145,
    height: 45,
    marginTop: 10,
  },

  buttonContainer: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 32,
  },

  button: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginBottom: 10,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "600",
  },

  emailIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  socialLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});