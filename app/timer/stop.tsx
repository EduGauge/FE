import { Ionicons } from "@expo/vector-icons";
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTodos } from "../../context/TodoContext";
import { useModal } from "../../components/ModalProvider";

export default function TimerStopScreen() {
  const { openProfile, openNotification } =
    useModal();

  const { todos } = useTodos();

  const params = useLocalSearchParams<{
    elapsed?: string;
  }>();

  const elapsedSeconds = Number(
    params.elapsed ?? 0
  );

  const checkedCount = todos.filter(
    (todo) => todo.checked
  ).length;

  const totalCount = todos.length;

  const progress =
    totalCount === 0
      ? 0
      : (checkedCount / totalCount) * 100;

  const groupedTodos = useMemo(() => {
    return todos.reduce(
      (acc, todo) => {
        if (!acc[todo.category]) {
          acc[todo.category] = [];
        }

        acc[todo.category].push(todo);

        return acc;
      },
      {} as Record<string, typeof todos>
    );
  }, [todos]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(
      seconds / 3600
    );

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    return `${hours
      .toString()
      .padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResume = () => {
    router.replace({
      pathname: "/timer",
      params: {
        elapsed: elapsedSeconds.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* 헤더 */}

      <View style={styles.header}>

        <Text style={styles.logo}>
          edu
          <Text style={styles.logoGauge}>
            gauge
          </Text>
        </Text>

        <View style={styles.headerRight}>

          <Pressable
            onPress={() =>
              openProfile()
            }
          >
            <Ionicons
              name="person-circle"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            style={styles.menuButton}
            onPress={() =>
              openNotification()
            }
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="#FFFFFF"
            />
          </Pressable>

        </View>

      </View>

      {/* 타이머 */}

      <View style={styles.timerSection}>

        <Text style={styles.timerText}>
          {formatTime(elapsedSeconds)}
        </Text>

      </View>

      {/* 리스트 */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {Object.entries(groupedTodos).map(
          ([category, items]) => (

            <View
              key={category}
              style={styles.categoryCard}
            >

              <View
                style={styles.categoryHeader}
              >
                <Text
                  style={styles.categoryText}
                >
                  {category}
                </Text>
              </View>

              <View
                style={styles.todoContainer}
              >

                {items.map((todo) => (

                  <View
                    key={todo.id}
                    style={styles.todoRow}
                  >

                    <Text
                      numberOfLines={1}
                      style={[
                        styles.todoText,
                        todo.checked &&
                          styles.checkedText,
                      ]}
                    >
                      {todo.title}
                    </Text>

                    <View
                      style={[
                        styles.checkCircle,
                        todo.checked &&
                          styles.checkedCircle,
                      ]}
                    >

                      {todo.checked && (
                        <Ionicons
                          name="checkmark"
                          size={15}
                          color="#10243A"
                        />
                      )}

                    </View>

                  </View>

                ))}

              </View>

            </View>

          )
        )}

      </ScrollView>


      <View style={styles.bottomArea}>

        <View
          style={styles.progressBackground}
        >

          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
              },
            ]}
          />

        </View>

        <Text style={styles.progressText}>
          {Math.round(progress)}%
        </Text>


        <Pressable
          style={styles.timerButton}
          onPress={handleResume}
        >

          <Ionicons
            name="play"
            size={38}
            color="#10243A"
          />

        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  header: {
    height: 82,
    marginHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#F6D64A",
    fontSize: 15,
    fontWeight: "800",
  },

  logoGauge: {
    color: "#4D8EAD",
    fontWeight: "600",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginLeft: 12,
  },

  timerSection: {
    alignItems: "center",
    marginBottom: 8,
  },

  timerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 180,
  },

  categoryCard: {
    marginTop: 26,
    marginBottom: 8,
  },

  categoryHeader: {
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryText: {
    color: "#10243A",
    fontSize: 14,
    fontWeight: "700",
  },

  todoContainer: {
    backgroundColor: "#5B6875",
    borderRadius: 14,
    paddingVertical: 8,
  },

  todoRow: {
    minHeight: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  todoText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    marginRight: 12,
  },

  checkedText: {
    color: "#F6D64A",
    textDecorationLine: "line-through",
  },

  checkCircle: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  checkedCircle: {
    backgroundColor: "#F6D64A",
  },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 22,
    paddingTop: 8,
    backgroundColor: "#10243A",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#46533E",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#F6D64A",
    borderRadius: 8,
  },

  progressText: {
    color: "#FFFFFF",
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },

  timerButton: {
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F6D64A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -28,
    borderWidth: 4,
    borderColor: "#10243A",
  },
});
