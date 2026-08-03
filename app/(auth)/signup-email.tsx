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

export default function SignupEmail() {
  const [email, setEmail] = useState("");

  // 나중에 API 연결 시 사용할 에러 상태
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = email.trim() !== "";

  const handleNext = () => {
    // TODO : 이메일 중복 검사 API

    router.push("/(auth)/signup-account");

    /*
    setErrorMessage(
      "이미 존재하는 이메일입니다. '이메일로 로그인'을 해주세요."
    );
    */
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
          이메일로 회원가입
        </Text>
      </View>

      {/* Character */}
      <View style={styles.character} />

      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#BDBDBD"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

    
      {errorMessage !== "" && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#FFFFFF"
          />

          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        </View>
      )}

     
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
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    fontSize: 16,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 125,
    left: 25,
    right: 25,
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginLeft: 5,
  },

  nextButton: {
    position: "absolute",
    left: 25,
    right: 25,
    bottom: 50,
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