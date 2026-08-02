import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#10243A",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 50,
        }}
      >
        로그인
      </Text>

      <TextInput
        placeholder="이메일"
        placeholderTextColor="#999"
        style={{
          width: "100%",
          height: 55,
          backgroundColor: "white",
          borderRadius: 12,
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      />

      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="#999"
        secureTextEntry
        style={{
          width: "100%",
          height: 55,
          backgroundColor: "white",
          borderRadius: 12,
          paddingHorizontal: 16,
          marginBottom: 30,
        }}
      />

      <Pressable
        onPress={() => router.replace("/(tabs)/list")}
        style={{
          width: "100%",
          height: 55,
          backgroundColor: "#9F82FF",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          로그인
        </Text>
      </Pressable>
    </View>
  );
}