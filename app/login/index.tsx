import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          로그인
        </Text>
      </View>

      {/* Character + Logo */}
      <View style={styles.logoSection}>

        {/* 임시 캐릭터 */}
        <View style={styles.character} />

        {/* 임시 로고 */}
        <Text style={styles.logoText}>
          LOGO
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}
          onPress={() => router.push("/login/email")}>
          <Ionicons
        name="mail-outline"
        size={22}
        color="#444"
          />
        <Text style={styles.buttonText}>이메일로 로그인</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Ionicons
        name="mail-outline"
        size={22}
        color="#444"
          />
        <Text style={styles.buttonText}>구글로 로그인</Text>
        </Pressable>
        
        <Pressable style={styles.button}>
          <Ionicons
        name="mail-outline"
        size={22}
        color="#444"
          />
        <Text style={styles.buttonText}>카카오톡으로 로그인</Text>
        </Pressable>
        
        <Pressable style={styles.button}>
          <Ionicons
        name="mail-outline"
        size={22}
        color="#444"
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
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 18,
  },

  backText: {
    fontSize: 22,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  logoSection: {
    alignItems: "center",
    marginTop: 50,
  },

  character: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#D9D9D9",
    marginBottom: 20,
  },

  logoText: {
    fontSize: 30,
    fontWeight: "bold",
  },

  button: {
  width: 320,
  height: 55,
  borderRadius: 28,
  borderWidth: 1,
  borderColor: "#D9D9D9",
  backgroundColor: "#FFFFFF",

  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",

  marginTop: 15,
},

buttonText: {
  fontSize: 16,
  fontWeight: "500",
  marginLeft: 12,
},

buttonContainer: {
    marginTop: 50,
    alignItems: "center",
},

});