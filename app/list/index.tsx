import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ListCard from "../../components/ListCard";
import { useModal } from "../../components/ModalProvider";
import { useTodos } from "../../context/TodoContext";

export default function ListScreen() {
  const { openProfile, openNotification } =
    useModal();

  const {
    todos,
    updateTodo,
    elapsedSeconds,
    setIsTimerRunning,
  } = useTodos();

  // -------------------------
  // 카테고리별 리스트 묶기
  // -------------------------

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

  // -------------------------
  // 리스트 완료율
  // -------------------------

  const checkedCount = todos.filter(
    (todo) => todo.checked
  ).length;

  const progress =
    todos.length === 0
      ? 0
      : (checkedCount / todos.length) * 100;

  // -------------------------
  // 리스트 체크
  // -------------------------

  const handleCheck = (id: string) => {
    const todo = todos.find(
      (item) => item.id === id
    );

    if (!todo) {
      return;
    }

    updateTodo({
      ...todo,
      checked: !todo.checked,
    });
  };

  // -------------------------
  // 시간 표시
  // -------------------------

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

  // -------------------------
  // 타이머 시작
  // -------------------------

  const handleStartTimer = () => {
    setIsTimerRunning(true);

    router.push("/timer");
  };

  return (
    <View style={styles.container}>

      {/* =========================
          Header
      ========================= */}

      <View style={styles.header}>

        <Text style={styles.logo}>
          LOGO
        </Text>

        <View style={styles.headerRight}>

          <Pressable
            onPress={() =>
              openProfile()
            }
          >
            <Ionicons
              name="person-circle-outline"
              size={30}
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

      <View style={styles.divider} />

      {/* =========================
          총 시간
      ========================= */}

      <Text style={styles.totalLabel}>
        총 시간
      </Text>

      <Text style={styles.totalTime}>
        {formatTime(elapsedSeconds)}
      </Text>

      {/* =========================
          리스트 완료 진행도
      ========================= */}

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

      {/* =========================
          리스트 Header
      ========================= */}

      <View style={styles.listHeader}>

        <Text style={styles.listTitle}>
          리스트
        </Text>

        <Pressable
          onPress={() =>
            router.push("/list/manage")
          }
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>

      </View>

      {/* =========================
          리스트 카드
      ========================= */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={
          false
        }
      >

        {Object.entries(
          groupedTodos
        ).map(
          ([category, items]) => (

            <ListCard
              key={category}
              category={category}
              todos={items}
              onCheck={handleCheck}
            />

          )
        )}

      </ScrollView>

      {/* =========================
          타이머 버튼
      ========================= */}

      <Pressable
        style={styles.timerButton}
        onPress={handleStartTimer}
      >

        <Ionicons
          name="play"
          size={42}
          color="#10243A"
        />

      </Pressable>

      {/* =========================
          하단 네비게이션
      ========================= */}

      <View style={styles.bottomNav}>

        {/* 캘린더 */}

        <Pressable
          style={styles.navItem}
          onPress={() =>
            router.push("/calendar")
          }
        >

          <Ionicons
            name="calendar-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.navText}>
            캘린더
          </Text>

        </Pressable>

        {/* 리스트 */}

        <Pressable
          style={styles.navItem}
          onPress={() =>
            router.push("/list")
          }
        >

          <Ionicons
            name="list-outline"
            size={22}
            color="#F6D64A"
          />

          <Text
            style={[
              styles.navText,
              styles.activeNavText,
            ]}
          >
            리스트
          </Text>

        </Pressable>

        {/* 친구 */}

        <Pressable
          style={styles.navItem}
          onPress={() =>
            router.push("/friend")
          }
        >

          <Ionicons
            name="people-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.navText}>
            친구
          </Text>

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
    marginTop: 55,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#F6D64A",
    fontSize: 22,
    fontWeight: "700",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginLeft: 12,
  },

  divider: {
    marginTop: 16,
    height: 1,
    backgroundColor: "#415366",
  },

  totalLabel: {
    marginTop: 30,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
  },

  totalTime: {
    marginTop: 10,
    color: "#F6D64A",
    textAlign: "center",
    fontSize: 56,
    fontWeight: "700",
  },

  progressBackground: {
    marginTop: 22,
    marginHorizontal: 24,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#55613A",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#F6D64A",
    borderRadius: 10,
  },

  listHeader: {
    marginTop: 32,
    marginHorizontal: 24,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollContent: {
  paddingBottom: 170,
},

timerButton: {
  position: "absolute",
  bottom: 88,
  alignSelf: "center",
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: "#F6D64A",
  justifyContent: "center",
  alignItems: "center",
},

bottomNav: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 72,
  backgroundColor: "#10243A",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingHorizontal: 28,
},

navItem: {
  width: 70,
  alignItems: "center",
  justifyContent: "center",
},

navText: {
  marginTop: 4,
  color: "#FFFFFF",
  fontSize: 11,
},

activeNavText: {
  color: "#F6D64A",
},
});
