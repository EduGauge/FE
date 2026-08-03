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

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
  email.trim() !== "" &&
  password.trim() !== "";

  const handleLogin = () => {
    console.log("이메일:", email);
    console.log("비밀번호:", password);

    // TODO: 로그인 API 연결
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
          color="white"
/>
        </Pressable>

        <Text style={styles.headerTitle}>
          이메일로 로그인
        </Text>
      </View>

      {/* TODO: 캐릭터 이미지 */}
      <View style={styles.character} />

     
      <View style={styles.form}>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#CFCFCF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#CFCFCF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

      </View>

      
      <Pressable
      style={[
        styles.loginButton,
        !isValid && styles.disabledButton,
   ]}
     disabled={!isValid}
    onPress={handleLogin}
>
        <Text style={[styles.loginButtonText,
        !isValid && styles.disabledButtonText,
        ]}>
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

  loginButton: {
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

  loginButtonText: {
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