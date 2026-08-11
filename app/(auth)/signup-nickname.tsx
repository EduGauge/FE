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

export default function SignupNickname() {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] =
    useState("");

  const isValid = nickname.trim() !== "";

  const handleComplete = () => {
    // TODO(API): 닉네임 중복 검사

    /*
    API 응답 예시

    1. 중복
    setNicknameError(
      "이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요."
    );

    2. 정상
    setNicknameError("");
    router.replace("/welcome");
    */

    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(auth)/signup-account")}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          닉네임 설정
        </Text>
      </View>

      <View style={styles.content}>
        <Image
          source={require("../../assets/characters/emoji_intro_6.png")}
          style={styles.character}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            placeholderTextColor="#FFFFFF"
            value={nickname}
            onChangeText={(text) => {
              setNickname(text);
              setNicknameError("");
            }}
          />

          {nicknameError !== "" && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="information-circle-outline"
                size={10}
                color="#FFFFFF"
              />

              <Text style={styles.errorText}>
                {nicknameError}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.bottomArea}>
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
    marginTop: 90,
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
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 6,
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 7,
    marginLeft: 4,
    flex: 1,
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