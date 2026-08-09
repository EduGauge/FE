import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Todo } from "../../context/TodoContext";
import ListCard from "../ListCard";

type ListViewProps = {
  todos: Todo[];
  elapsedSeconds: number;
  onToggleTodo: (id: string) => void;
  onStartTimer: () => void;
  onManageList?: () => void;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function ListView({
  todos,
  elapsedSeconds,
  onToggleTodo,
  onStartTimer,
  onManageList,
}: ListViewProps) {
  const groupedTodos = useMemo(
    () =>
      todos.reduce<Record<string, Todo[]>>(
        (groups, todo) => {
          (groups[todo.category] ??= []).push(todo);
          return groups;
        },
        {}
      ),
    [todos]
  );

  const completedCount = todos.filter(
    (todo) => todo.checked
  ).length;

  const progress =
    (completedCount / todos.length) * 100;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 총 시간 */}
      <Text style={styles.totalLabel}>
        총 시간
      </Text>

      <Text style={styles.totalTime}>
        {formatTime(elapsedSeconds)}
      </Text>

      {/* 진행바 */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      {/* 타이머 버튼 */}
      <Pressable
        onPress={onStartTimer}
        style={styles.playButton}
      >
        <Image
          source={require("../../assets/icons/timer.png")}
          style={styles.timerIcon}
          resizeMode="contain"
        />
      </Pressable>

      {/* 리스트 제목 */}
      <View style={styles.listTitleRow}>
        <Text style={styles.listTitle}>
          리스트
        </Text>

        <Pressable
          disabled={!onManageList}
          onPress={onManageList}
          hitSlop={12}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      {/* 리스트 카드 */}
      <View style={styles.cards}>
        {Object.entries(groupedTodos).map(
          ([category, categoryTodos]) => (
            <ListCard
              key={category}
              category={category}
              todos={categoryTodos}
              onCheck={onToggleTodo}
            />
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 40,
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
  },

  totalTime: {
    color: "#E3C943",
    fontSize: 64,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },

  progressTrack: {
    width: "100%",
    height: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#454E36",
  },

  progress: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#F5D33F",
  },

  playButton: {
    width: 100,
    height: 100,
    marginTop: 32,
    alignSelf: "center",
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  timerIcon: {
    width: 100,
    height: 100,
  },

  listTitleRow: {
    marginTop: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },

  cards: {
    marginTop: 14,
  },
});