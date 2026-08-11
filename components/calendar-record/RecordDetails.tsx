import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { formatTime } from "./record-utils";
import type { CalendarTodo } from "./types";

type RecordDetailsProps = {
  progress: number;
  elapsedSeconds: number;
  todos: CalendarTodo[];
};

export default function RecordDetails({
  progress,
  elapsedSeconds,
  todos,
}: RecordDetailsProps) {
  return (
    <View style={styles.recordSection}>
      <View style={styles.firstGaugeArea}>
        <Text style={styles.gaugeTitle}>이 날의 GAUGE</Text>
        <View style={styles.gauge}>
          <View style={[styles.gaugeFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <Text style={styles.timeText}>{formatTime(elapsedSeconds)}</Text>

      <View style={styles.todoList}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoCard}>
            <View style={styles.todoHeader}>
              <Text style={styles.todoCategory}>{todo.category}</Text>
            </View>

            <View style={styles.todoBody}>
              <Text style={[styles.todoText, todo.checked && styles.todoChecked]}>
                {todo.title}
              </Text>
              <View
                style={[
                  styles.checkCircle,
                  todo.checked && styles.checkCircleActive,
                ]}
              >
                {todo.checked && (
                  <Ionicons name="checkmark" size={14} color="#10243A" />
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recordSection: { paddingTop: 0, paddingHorizontal: 18 },
  firstGaugeArea: { paddingHorizontal: 30, paddingBottom: 35 },
  gaugeTitle: {
    color: "#10243A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  gauge: {
    height: 26,
    marginHorizontal: 12,
    backgroundColor: "#F2EED3",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D6D0A8",
  },
  gaugeFill: {
    height: "100%",
    backgroundColor: "#E9CB39",
    borderRadius: 14,
  },
  timeText: {
    color: "#E9CB39",
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 38,
    marginBottom: 42,
  },
  todoList: { gap: 14 },
  todoCard: {
    borderRadius: 14,
    overflow: "visible",
    marginTop: 10,
    backgroundColor: "#465A68",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  todoHeader: {
    height: 38,
    backgroundColor: "#071F30",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 0,
    marginTop: -10,
    zIndex: 10,
    elevation: 5,
  },
  todoCategory: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  todoBody: {
    minHeight: 70,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: { flex: 1, color: "#FFFFFF", fontSize: 12, lineHeight: 20 },
  todoChecked: { color: "#E9CB39", textDecorationLine: "line-through" },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  checkCircleActive: { backgroundColor: "#E9CB39" },
});
