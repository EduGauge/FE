import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export interface CalendarTodo {
  id: string;
  title: string;
  checked: boolean;
  category: string;
}

export interface CalendarRecord {
  date: string;
  progress: number;
  elapsedSeconds: number;
  completed: boolean;
  photo: boolean;
  todos: CalendarTodo[];
}

interface Props {
  visible: boolean;
  record: CalendarRecord | null;
  onClose: () => void;
}

export default function CalendarRecordModal({
  visible,
  record,
  onClose,
}: Props) {
  if (!record) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >

        <Pressable
          style={styles.modalCard}
          onPress={(event) =>
            event.stopPropagation()
          }
        >

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.scrollContent
            }
          >

            

            <Text style={styles.dateText}>
              {record.date}
            </Text>

            {/* =========================
                100% 완료
            ========================= */}

            {record.completed ? (
              <>
                {/* 인증샷 */}

                <View
                  style={styles.photoArea}
                >
                  <View
                    style={
                      styles.photoPlaceholder
                    }
                  >
                    <Ionicons
                      name="image-outline"
                      size={48}
                      color="#FFFFFF"
                    />

                    <Text
                      style={
                        styles.photoPlaceholderText
                      }
                    >
                      인증샷
                    </Text>
                  </View>

                  {/* 사진 위 시간 */}
                  <Text
                    style={
                      styles.photoTime
                    }
                  >
                    00:03
                  </Text>

                  {/* 인증 게이지 */}
                  <View
                    style={
                      styles.photoGauge
                    }
                  >
                    <View
                      style={
                        styles.photoGaugeFill
                      }
                    />
                  </View>
                </View>

                <View
                  style={styles.completeMessage}
                >
                  <Text
                    style={
                      styles.completeMessageText
                    }
                  >
                    오늘의 에듀게이지는
                  </Text>

                  <Text
                    style={
                      styles.completeMessageText
                    }
                  >
                    100%!!!!
                  </Text>
                </View>
              </>
            ) : (
              <>
                {/* =========================
                    미완료
                ========================= */}

                <Text
                  style={
                    styles.encourageText
                  }
                >
                  절반은 하고 절반은 못했네요,,{"\n"}
                  좀 더 열심히 해볼까요~?
                </Text>

                {/* 임시 캐릭터 */}
                <View
                  style={
                    styles.characterArea
                  }
                >
                  <Text
                    style={
                      styles.largeCharacter
                    }
                  >
                    😐
                  </Text>
                </View>

                <Text
                  style={
                    styles.gaugeTitle
                  }
                >
                  이 날의 GAUGE
                </Text>

                <View
                  style={styles.gauge}
                >
                  <View
                    style={[
                      styles.gaugeFill,
                      {
                        width: `${record.progress}%`,
                      },
                    ]}
                  />
                </View>
              </>
            )}

            {/* =========================
                기록 영역
                record2
            ========================= */}

            <View
              style={styles.recordSection}
            >

              <Text
                style={styles.gaugeTitle}
              >
                이 날의 GAUGE
              </Text>

              <View
                style={styles.gauge}
              >
                <View
                  style={[
                    styles.gaugeFill,
                    {
                      width: `${record.progress}%`,
                    },
                  ]}
                />
              </View>

              {/* 시간 */}

              <Text
                style={styles.timeText}
              >
                {formatTime(
                  record.elapsedSeconds
                )}
              </Text>

              {/* Todo */}

              <View
                style={styles.todoList}
              >
                {record.todos.map(
                  (todo) => (
                    <View
                      key={todo.id}
                      style={
                        styles.todoCard
                      }
                    >

                      <View
                        style={
                          styles.todoHeader
                        }
                      >
                        <Text
                          style={
                            styles.todoCategory
                          }
                        >
                          {todo.category}
                        </Text>
                      </View>

                      <View
                        style={
                          styles.todoBody
                        }
                      >

                        <Text
                          style={[
                            styles.todoText,
                            todo.checked &&
                              styles.todoChecked,
                          ]}
                        >
                          {todo.title}
                        </Text>

                        <View
                          style={[
                            styles.checkCircle,
                            todo.checked &&
                              styles.checkCircleActive,
                          ]}
                        >
                          {todo.checked && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color="#10243A"
                            />
                          )}
                        </View>

                      </View>

                    </View>
                  )
                )}
              </View>

            </View>

          </ScrollView>

        </Pressable>

      </Pressable>
    </Modal>
  );
}

function formatTime(
  seconds: number
) {
  const minutes = Math.floor(
    seconds / 60
  );

  const secs = seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.68)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  modalCard: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  dateText: {
    color: "#10243A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 22,
  },

  photoArea: {
    width: "100%",
    height: 300,
    position: "relative",
    backgroundColor: "#B7B7B7",
    overflow: "hidden",
  },

  photoPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#82909B",
  },

  photoPlaceholderText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 8,
  },

  photoTime: {
    position: "absolute",
    top: 18,
    left: 18,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  photoGauge: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 20,
    height: 22,
    borderRadius: 12,
    backgroundColor: "#F6D64A",
  },

  photoGaugeFill: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#F6D64A",
  },

  completeMessage: {
    minHeight: 170,
    justifyContent: "center",
    alignItems: "center",
  },

  completeMessageText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 25,
  },

  encourageText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 20,
    marginTop: 6,
  },

  characterArea: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  largeCharacter: {
    fontSize: 130,
  },

  gaugeTitle: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  gauge: {
    height: 24,
    marginHorizontal: 30,
    backgroundColor: "#F2EED3",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D6D0A9",
  },

  gaugeFill: {
    height: "100%",
    backgroundColor: "#E9CB39",
    borderRadius: 14,
  },

  recordSection: {
    paddingTop: 32,
    paddingHorizontal: 18,
  },

  timeText: {
    color: "#E9CB39",
    fontSize: 60,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 48,
  },

  todoList: {
    gap: 16,
  },

  todoCard: {
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#465A68",
  },

  todoHeader: {
    height: 38,
    backgroundColor: "#071F30",
    justifyContent: "center",
    alignItems: "center",
  },

  todoCategory: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  todoBody: {
    minHeight: 70,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  todoText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 20,
  },

  todoChecked: {
    color: "#E9CB39",
    textDecorationLine: "line-through",
  },

  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  checkCircleActive: {
    backgroundColor: "#E9CB39",
  },
});