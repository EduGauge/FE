import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FriendAddNicknameScreen() {
  const [friendNickname, setFriendNickname] =
    useState("");

  const handleConfirm = () => {
    const trimmedNickname =
      friendNickname.trim();

    if (!trimmedNickname) {
      return;
    }

    console.log(
      "닉네임으로 친구 추가:",
      trimmedNickname,
    );

    // 나중에 친구 추가 API 연결
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 제목 */}
        <Text style={styles.title}>
          닉네임으로 친구 추가
        </Text>

        {/* 입력창 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            친구 닉네임
          </Text>

          <TextInput
            value={friendNickname}
            onChangeText={setFriendNickname}
            placeholder="piccassso"
            placeholderTextColor="#0A2333"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
          />
        </View>

        {/* 하단 버튼 */}
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.button}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>
              확인
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>
              취소
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  card: {
    width: "100%",
    maxWidth: 376,
    height: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    textAlign: "center",
    color: "#071F30",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 29,
  },

  inputContainer: {
    height: 40,
    width: 340,
    borderRadius: 17,
    backgroundColor: "#C9CED2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  inputLabel: {
    color: "#071F30",
    fontSize: 8,
    fontWeight: "500",
  },

  input: {
    flex: 1,
    color: "#071F30",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "right",
    paddingVertical: 0,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 26,
  },

  button: {
    minWidth: 80,
    alignItems: "center",
    paddingVertical: 8,
  },

  buttonText: {
    color: "#071F30",
    fontSize: 13,
    fontWeight: "500",
  },
});