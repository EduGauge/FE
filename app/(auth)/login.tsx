import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
        <Ionicons
          name="chevron-back"
          size={28}
          color="white"
/>
        </Pressable>

        <Text style={styles.headerTitle}>로그인</Text>
      </View>

      {/* Character */}
      <View style={styles.character} />

      {/* Logo */}
      <Text style={styles.logo}>LOGO</Text>

      
      <View style={styles.buttonContainer}>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/(auth)/email")}
        >
          <Ionicons
            name="mail-outline"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
  />

          <Text style={styles.buttonText}>이메일로 로그인</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => console.log("Google Login")}
        >
          <Ionicons
            name="logo-google"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
  />
          <Text style={styles.buttonText}>구글로 로그인</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => console.log("Kakao Login")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
  />
          <Text style={styles.buttonText}>카카오톡으로 로그인</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => console.log("Naver Login")}
        >
          <Ionicons
            name="globe-outline"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
  />
          <Text style={styles.buttonText}>네이버로 로그인</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  header: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 24,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  character: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginTop: 40,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 70,
  },

  buttonContainer: {
    alignItems: "center",
  },

  button: {
    width: 330,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  icon: {
    fontSize: 22,
    marginRight: 14,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10243A",
  },

  buttonIcon: {
  position: "absolute",
  left: 28,
},
});