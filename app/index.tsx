import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#10243A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          marginBottom: 40,
        }}
      >
        캐릭터 자리
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 32,
          marginBottom: 80,
        }}
      >
        LOGO
      </Text>

      <Pressable
        onPress={() => router.push("/signup")}
        style={{
          width: 280,
          height: 55,
          backgroundColor: "white",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text>에듀게이지가 처음이라면, </Text>
        <Text>회원가입하기</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/login")}
        style={{
          width: 280,
          height: 55,
          backgroundColor: "white",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>이미 계정이 있다면, </Text>
        <Text>로그인하기</Text>
      </Pressable>
    </View>
  );
}