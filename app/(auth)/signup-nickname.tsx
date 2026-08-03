import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignupNickname() {
  const [nickname, setNickname] = useState("");

  // 나중에 API 연결 시 사용할 에러 상태
  const [nicknameError, setNicknameError] = useState("");

  const isValid = nickname.trim() !== "";

  const handleComplete = () => {
    // TODO(API) : 닉네임 중복 검사

    /*
    API 응답 예시

    1. 중복
    setNicknameError(
      "이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요."
    );

    2. 정상
    setNicknameError("");
    router.replace("/(tabs)/list");
    */

    router.replace("/(tabs)/list");
  };

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
          닉네임 설정
        </Text>
      </View>

      {/* Character */}
      <View style={styles.character} />

      {/* Input */}
      <View style={styles.form}>

        <TextInput
          style={styles.input}
          placeholder="닉네임"
          placeholderTextColor="#CFCFCF"
          value={nickname}
          // TODO(API) : API 연결 후 아래 setNicknameError("") 제거
          // 에러는 handleComplete()에서 서버 응답으로만 관리
          onChangeText={(text) => {
            setNickname(text);
            setNicknameError("");
          }}
        />

        {nicknameError !== "" && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.errorText}>
              {nicknameError}
            </Text>
          </View>
        )}

      </View>

      {/* Complete Button */}
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
            !isValid && styles.disabledButtonText,
          ]}
        >
          완료
        </Text>
      </Pressable>

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
    marginBottom: 60,
  },

  form: {
    paddingHorizontal: 25,
  },

  input: {
    height: 55,
    backgroundColor: "#7C8792",
    borderRadius: 30,
    paddingHorizontal: 20,
    color: "#FFFFFF",
    marginBottom: 8,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 6,
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginLeft: 5,
    flex: 1,
  },

  completeButton: {
    position: "absolute",
    bottom: 50,
    left: 25,
    right: 25,

    height: 58,
    borderRadius: 30,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",
  },

  completeButtonText: {
    color: "#10243A",
    fontSize: 18,
    fontWeight: "600",
  },

  disabledButton: {
    backgroundColor: "#D9D9D9",
  },

  disabledButtonText: {
    color: "#A5A5A5",
  },

});