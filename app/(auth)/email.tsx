import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    email.trim() !== "" &&
    password.trim() !== "";

  const handleLogin = () => {
    if (!isValid) {
      return;
    }

    console.log("이메일:", email);
    console.log("비밀번호:", password);

    // TODO: 로그인 API 연결
    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(auth)/login")}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          이메일로 로그인
        </Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../assets/characters/emoji_intro_4.png")}
          style={styles.character}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            placeholderTextColor="#FFFFFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#FFFFFF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.bottomArea}>
        <Pressable
          style={[
            styles.completeButton,
            !isValid && styles.disabledButton,
          ]}
          disabled={!isValid}
          onPress={handleLogin}
        >
          <Text
            style={[
              styles.completeButtonText,
              !isValid &&
                styles.disabledButtonText,
            ]}
          >
            완료
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
    fontSize: 13,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    alignItems: "center",
  },

  character: {
    width: 110,
    height: 110,
    marginTop: 88,
    marginBottom: 78,
  },

  form: {
    width: "100%",
    paddingHorizontal: 20,
  },

  input: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#667580",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    paddingHorizontal: 20,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  completeButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  completeButtonText: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "600",
  },

  disabledButton: {
    backgroundColor: "#D9D9D9",
  },

  disabledButtonText: {
    color: "#A5A5A5",
  },
});