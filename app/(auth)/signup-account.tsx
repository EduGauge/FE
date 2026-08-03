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

export default function SignupAccount() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 나중에 API 연결 시 사용할 에러 상태
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValid =
    id.trim() !== "" &&
    password.trim() !== "";

  const handleNext = () => {
  // TODO : 백엔드 회원가입 검증 API 연결

  /*
  API 응답 예시

  1. 아이디 중복
  setIdError("이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.");

  2. 비밀번호 형식 오류
  setPasswordError("영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.");

  3. 둘 다 오류
  setIdError("이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.");
  setPasswordError("영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.");

  4. 둘 다 정상
  setIdError("");
  setPasswordError("");

  router.push("/(auth)/signup-nickname");
  */

    router.push("/(auth)/signup-nickname");
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
          아이디 및 비밀번호 설정
        </Text>
      </View>

      {/* Character */}
      <View style={styles.character} />

      
      <View style={styles.form}>

        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#CFCFCF"
          autoCapitalize="none"
          value={id}
          // TODO : API 연결 후 아래 setIdError("") 제거
          // 에러는 handleNext()에서 서버 응답으로만 관리
          onChangeText={(text) => {
            setId(text);
            setIdError("");
          }}
        />

        {idError !== "" && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.errorText}>
              {idError}
            </Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#CFCFCF"
          secureTextEntry
          value={password}
          // TODO : API 연결 후 아래 setIdError("") 제거
          // 에러는 handleNext()에서 서버 응답으로만 관리
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
        />

        {passwordError !== "" && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.errorText}>
              {passwordError}
            </Text>
          </View>
        )}

      </View>

      
      <Pressable
        style={[
          styles.nextButton,
          !isValid && styles.disabledButton,
        ]}
        disabled={!isValid}
        onPress={handleNext}
      >
        <Text
          style={[
            styles.nextButtonText,
            !isValid && styles.disabledButtonText,
          ]}
        >
          다음
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
    marginBottom: 20,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -12,
    marginBottom: 20,
    paddingHorizontal: 6,
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginLeft: 5,
    flex: 1,
  },

  nextButton: {
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

  nextButtonText: {
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