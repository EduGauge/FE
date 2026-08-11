import { router } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";

export default function StartScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/characters/emoji_intro_1.png")}
        style={styles.character}
        resizeMode="contain"
      />
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
  },
});