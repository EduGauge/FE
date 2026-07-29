import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EmailLogin() {
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
          이메일로 로그인
        </Text>
      </View>

      {/* 입력 영역 */}
      <View style={styles.form}>

        <TextInput
          placeholder="이메일"
          style={styles.input}
        />

        <TextInput
          placeholder="비밀번호"
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>
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
    backgroundColor: "#fff",
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

  form: {
    marginTop: 50,
    alignItems: "center",
  },

  input: {
    width: 320,
    height: 55,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  loginButton: {
    width: 320,
    height: 55,
    backgroundColor: "#10243A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});