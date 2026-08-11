import { router } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function WelcomeScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/list");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/characters/emoji_intro_7.png")}
        style={styles.character}
        resizeMode="contain"
      />

      <Image
        source={require("../../assets/logos/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        홍익와우 님, 
      </Text>

      <Text style={styles.message}>
        에듀게이지에 오신 것을 환영합니다!
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

  character: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },

  logo: {
    width: 130,
    height: 42,
    marginBottom: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  message: {
    color: "#FFFFFF",
    fontSize: 13,
  },
});