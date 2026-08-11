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

export default function SignupEmail() {
  const [email, setEmail] = useState("");

  const isValid = email.trim() !== "";

  const handleComplete = () => {
    if (!isValid) {
      return;
    }

    // TODO(API): 이메일 중복 검사

    router.replace("/(auth)/signup-account");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={10}
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
            이메일 중복 확인 후 회원가입을 진행해주세요.
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 18,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
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
    marginLeft: 5,
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