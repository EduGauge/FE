import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Signup() {
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
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          회원가입
        </Text>
      </View>

      {/* Character */}
      <View style={styles.character} />

      {/* Logo */}
      <Text style={styles.logo}>
        LOGO
      </Text>

      
      <View style={styles.buttonContainer}>

        
        <Pressable
          style={styles.button}
          onPress={() => router.push("/(auth)/signup-email")}
        >
          <Ionicons
            name="mail-outline"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonText}>
            이메일로 회원가입
          </Text>
        </Pressable>

      
        <Pressable
          style={styles.button}
          onPress={() => console.log("Google Signup")}
        >
          <Ionicons
            name="logo-google"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonText}>
            구글로 회원가입
          </Text>
        </Pressable>

        
        <Pressable
          style={styles.button}
          onPress={() => console.log("Kakao Signup")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonText}>
            카카오톡으로 회원가입
          </Text>
        </Pressable>

       
        <Pressable
          style={styles.button}
          onPress={() => console.log("Naver Signup")}
        >
          <Ionicons
            name="globe-outline"
            size={22}
            color="#10243A"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonText}>
            네이버로 회원가입
          </Text>
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
    textAlign: "center",
    marginTop: 30,
    marginBottom: 70,
  },

  buttonContainer: {
    alignItems: "center",
  },

  button: {
    width: 330,
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 24,
    marginBottom: 18,
  },

  buttonIcon: {
    width: 24,
  },

  buttonText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#10243A",

    marginRight: 24,
  },

});