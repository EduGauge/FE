import { StyleSheet, Text, View } from "react-native";

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        리스트 화면입니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
  },
});