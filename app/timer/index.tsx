import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ListCard from "../../components/list/ListCard";
import { useModal } from "../../components/ModalProvider";
import { useTodos } from "../../context/TodoContext";
import { useCategories } from "../../context/CategoryContext";

export default function TimerScreen() {
  const { categories } = useCategories();
  const { openProfile, openNotification } =
    useModal();

  const {
    todos,
    updateTodo,
    elapsedSeconds,
    isTimerRunning,
    setElapsedSeconds,
    setIsTimerRunning,
  } = useTodos();

  const [
    showFinishModal,
    setShowFinishModal,
  ] = useState(false);

  const startedAtRef =
    useRef<number | null>(null);

  const baseElapsedRef =
    useRef(elapsedSeconds);

  const finishHandledRef =
    useRef(false);

  // -------------------------
  // 카테고리별 그룹
  // -------------------------

  const groupedTodos = useMemo(() => {
    return todos.reduce(
      (acc, todo) => {
        if (!acc[todo.categoryId]) {
          acc[todo.categoryId] = [];
        }

        acc[todo.categoryId].push(todo);

        return acc;
      },
      {} as Record<string, typeof todos>
    );
  }, [todos]);

  // -------------------------
  // 완료율
  // -------------------------

  const checkedCount = todos.filter(
    (todo) => todo.checked
  ).length;

  const totalCount = todos.length;

  const progress =
    totalCount === 0
      ? 0
      : (checkedCount / totalCount) * 100;

  // -------------------------
  // 시간 표시
  // -------------------------

  const formatTime = (
    seconds: number
  ) => {
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
  // 타이머 실행
  // -------------------------

  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    startedAtRef.current =
      Date.now();

    baseElapsedRef.current =
      elapsedSeconds;

    const interval =
      setInterval(() => {
        if (
          startedAtRef.current === null
        ) {
          return;
        }

        const currentElapsed =
          baseElapsedRef.current +
          Math.floor(
            (Date.now() -
              startedAtRef.current) /
              1000
          );

        setElapsedSeconds(
          currentElapsed
        );
      }, 250);

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning]);

  // -------------------------
  // 리스트 체크
  // -------------------------

  const handleCheck = (
    id: string
  ) => {
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
  // 리스트 전체 완료
  // -------------------------

  useEffect(() => {
    if (
      totalCount > 0 &&
      checkedCount === totalCount &&
      !finishHandledRef.current
    ) {
      finishHandledRef.current =
        true;

      // 타이머 정지
      setIsTimerRunning(false);

      // 현재 화면 유지 + 완료 모달 표시
      setShowFinishModal(true);
    }
  }, [
    checkedCount,
    totalCount,
  ]);

  // -------------------------
  // 타이머 종료
  // → list 메인으로 이동
  // -------------------------

  const handleStop = () => {
    setIsTimerRunning(false);

    router.replace("/list");
  };

  return (
    <View style={styles.container}>

      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>

        <Text style={styles.logo}>
          edu
          <Text style={styles.logoGauge}>
            gauge
          </Text>
        </Text>

        <View
          style={styles.headerRight}
        >

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

      {/* =========================
          TIMER
      ========================= */}

      <View
        style={styles.timerSection}
      >
        <Text
          style={styles.timerText}
        >
          {formatTime(
            elapsedSeconds
          )}
        </Text>
      </View>

      {/* =========================
          LIST
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

        {categories.map(
          (category) => (

            <ListCard
              key={category.id}
              category={category.name}
              todos={groupedTodos[category.id] ?? []}
              onCheck={handleCheck}
            />

          )
        )}

      </ScrollView>

      {/* =========================
          BOTTOM AREA
      ========================= */}

      <View
        style={styles.bottomArea}
      >

        {/* 안내 문구 */}

        <View
          style={styles.timerGuide}
        >
          <Ionicons
            name="information-circle-outline"
            size={13}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.timerGuideText
            }
          >
            3초 이상 누르면 타이머가
            종료됩니다.
          </Text>
        </View>

        {/* 타이머 버튼 */}

        <Pressable
          style={styles.timerButton}
          onLongPress={handleStop}
          delayLongPress={3000}
        >
          <Ionicons
            name="pause"
            size={38}
            color="#10243A"
          />
        </Pressable>

        {/* 게이지 */}

        <View
          style={
            styles.progressBackground
          }
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

      </View>

      {/* =========================
          완료 모달
      ========================= */}

      {showFinishModal && (
        <View
          style={
            styles.modalOverlay
          }
        >

          <View
            style={styles.finishModal}
          >

            <Text
              style={
                styles.finishDescription
              }
            >
              에듀게이지 100% 달성을 축하드립니다!
              {"\n"}
              인증 사진을 촬영하시겠습니까?
            </Text>

            <View
              style={
                styles.modalButtons
              }
            >

              {/* 취소 */}

              <Pressable
                style={
                  styles.modalButton
                }
                onPress={() => {
                  setShowFinishModal(
                    false
                  );

                  router.replace(
                    "/list"
                  );
                }}
              >
                <Text
                  style={
                    styles.modalButtonText
                  }
                >
                  취소
                </Text>
              </Pressable>

              {/* 확인 */}

              <Pressable
                style={
                  styles.modalButton
                }
                onPress={() => {
                  setShowFinishModal(
                    false
                  );

                  router.replace(
                    "/camera"
                  );
                }}
              >
                <Text
                  style={
                    styles.modalButtonText
                  }
                >
                  확인
                </Text>
              </Pressable>

            </View>

          </View>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  // =========================
  // 전체
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  // =========================
  // Header
  // =========================

  header: {
    height: 82,
    marginHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
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

  // =========================
  // Timer
  // =========================

  timerSection: {
    alignItems: "center",
    marginBottom: 8,
  },

  timerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // =========================
  // List
  // =========================

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 220,
  },

  // =========================
  // Bottom
  // =========================

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

  // =========================
  // 안내 문구
  // =========================

  timerGuide: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B6875",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 24,
  },

  timerGuideText: {
    color: "#FFFFFF",
    fontSize: 9,
    marginLeft: 4,
  },

  // =========================
  // 타이머 버튼
  // =========================

  timerButton: {
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F6D64A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  // =========================
  // 게이지
  // =========================

  progressBackground: {
    height: 12,
    backgroundColor: "#46533E",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#F6D64A",
    borderRadius: 8,
  },

  // =========================
  // 완료 모달
  // =========================

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:
      "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  finishModal: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
  },

  finishDescription: {
    color: "#10243A",
    textAlign: "center",
    marginBottom: 24,
  },

  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },

  modalButtonText: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "600",
  },
});
