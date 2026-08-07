import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MyPageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        마이페이지입니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10243A",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
});