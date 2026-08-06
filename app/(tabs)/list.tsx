import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ListScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.totalLabel}>
        총 시간
      </Text>

      <Text style={styles.totalTime}>
        00:00
      </Text>

      <View style={styles.progressBackground}>
        <View style={styles.progressBar} />
      </View>

      <View style={styles.addContainer}>
        <Text style={styles.addTitle}>
          리스트
        </Text>

        <Pressable
          style={styles.addIcon}
          onPress={() => router.push("/list/create")}
          hitSlop={10}
        >
          <MaterialIcons
            name="add"
            size={30}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      <Text style={styles.addSubText}>
        리스트에 할 일을 추가해보세요!
      </Text>

      <View style={styles.emptyContainer}>
        {/* 임시 캐릭터 */}
        <View style={styles.character} />

        <Text style={styles.emptyText}>
          작성된 리스트가 없습니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  totalLabel: {
    marginTop: 55,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },

  totalTime: {
    marginTop: 10,
    textAlign: "center",
    color: "#F6D64A",
    fontSize: 58,
    fontWeight: "700",
  },

  progressBackground: {
    height: 18,
    marginTop: 25,
    marginHorizontal: 25,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#55613A",
  },

  progressBar: {
    width: "0%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#F6D64A",
  },

  addContainer: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  addIcon: {
    marginLeft: 2,
  },

  addSubText: {
    marginTop: 8,
    textAlign: "center",
    color: "#D0D0D0",
    fontSize: 12,
  },

  emptyContainer: {
    marginTop: 45,
    alignItems: "center",
  },

  character: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "#A6A6A6",
  },

  emptyText: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 16,
  },
});