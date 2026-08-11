import { router } from "expo-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ListCard from "../../components/list/ListCard";
import Header from "../../components/Header";
import { useTodos } from "../../context/TodoContext";
import { useCategories } from "../../context/CategoryContext";

export default function TimerScreen() {
  const { categories } = useCategories();

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

  const progressCharacterSource =
    progress < 25
      ? require("../../assets/characters/progress1.png")
      : progress < 50
        ? require("../../assets/characters/progress2.png")
        : progress < 75
          ? require("../../assets/characters/progress3.png")
          : require("../../assets/characters/progress4.png");

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
  }, [
    isTimerRunning,
    elapsedSeconds,
    setElapsedSeconds,
  ]);

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
    setIsTimerRunning,
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
      <Header variant="logo" />

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
              todos={
                groupedTodos[
                  category.id
                ] ?? []
              }
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

        {/* 일시정지 버튼 */}

        <View pointerEvents="none" style={styles.pauseLine} />

        <View style={styles.timerButtonContainer}>
          <Pressable
            style={styles.timerButton}
            onPress={handleStop}
          >
            <Image
              source={require("../../assets/icons/stop.png")}
              style={styles.stopIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* 게이지 */}

        <View style={styles.progressTrackContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <Image
            source={progressCharacterSource}
            style={[
              styles.progressCharacter,
              {
                left: `${progress}%`,
                transform: [{ translateX: -(progress / 100) * 50 }],
              },
            ]}
            resizeMode="contain"
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
  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  timerSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  timerText: {
    color: "#E3C943",
    fontSize: 64,
    fontWeight: "700",
    letterSpacing: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 220,
  },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#10243A",
    justifyContent: "flex-end",
  },

  timerButtonContainer: {
    position: "absolute",
    top: -55,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },

  timerButton: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },

  pauseLine: {
    position: "absolute",
    top: -3,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#3E4935",
  },

  stopIcon: {
    width: 100,
    height: 100,
  },

  progressBackground: {
    height: 20,
    backgroundColor: "#3E4935",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressTrackContainer: {
    height: 70,
    justifyContent: "center",
  },

  progressCharacter: {
    position: "absolute",
    top: -4,
    width: 50,
    height: 72,
    zIndex: 2,
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#E3C943",
    borderRadius: 10,
  },

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
    width: "90%",
    height: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 50,
    alignItems: "center",
  },

  finishDescription: {
    color: "#10243A",
    textAlign: "center",
    marginBottom: 12,
    fontSize: 13,
    fontWeight: "500",
  },

  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
  },

  modalButtonText: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "500",
  },
});
