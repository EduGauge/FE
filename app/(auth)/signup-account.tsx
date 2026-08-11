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

export default function SignupAccount() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    nickname.trim() !== "" &&
    password.trim() !== "";

  const handleComplete = () => {
    if (!isValid) {
      return;
    }

    // TODO(API): 아이디 및 비밀번호 설정 API 연결

    router.replace("/(auth)/signup-nickname");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(auth)/signup-email")}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          아이디 및 비밀번호 설정
        </Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../assets/characters/emoji_intro_5.png")}
          style={styles.character}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="아이디"
            placeholderTextColor="#FFFFFF"
            value={nickname}
            onChangeText={setNickname}
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
        <View style={styles.guideContainer}>
          <Ionicons
            name="information-circle-outline"
            size={10}
            color="#FFFFFF"
          />

          <Text style={styles.guideText}>
            아이디와 비밀번호를 입력해주세요.
          </Text>
        </View>

        <Pressable
          style={[
            styles.completeButton,
            !isValid && styles.disabledButton,
          ]}
          disabled={!isValid}
          onPress={handleComplete}
        >
          <Text
            style={[
              styles.completeButtonText,
              !isValid &&
                styles.disabledButtonText,
            ]}
          >
            다음
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
    fontSize: 12,
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

  guideContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  guideText: {
    color: "#FFFFFF",
    fontSize: 9,
    marginLeft: 4,
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