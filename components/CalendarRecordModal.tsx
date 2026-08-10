import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const logoBack = require("../assets/logos/logo.png");

// 게이지별 캐릭터
// 100% → 1번
// 70% 이상 → 2번
// 30% 이상 → 3번
// 0% 이상 → 4번
const character100 = require(
  "../assets/characters/calendar_record_1.png"
);
const character70 = require(
  "../assets/characters/calendar_record_2.png"
);

const character30 = require(
  "../assets/characters/calendar_record_3.png"
);

const character0 = require(
  "../assets/characters/calendar_record_4.png"
);

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

  // 실제 인증샷 URI
  photoUri?: string;

  todos: CalendarTodo[];
}

interface Props {
  visible: boolean;
  record: CalendarRecord | null;
  onClose: () => void;
}

/* =====================================================
   게이지에 따른 캐릭터
   ===================================================== */

const getCharacter = (
  progress: number
): ImageSourcePropType => {
  if (progress >= 100) {
    return character100;
  }

  if (progress >= 70) {
    return character70;
  }

  if (progress >= 30) {
    return character30;
  }

  return character0;
};

/* =====================================================
   게이지에 따른 문구
   ===================================================== */

const getRecordMessage = (progress: number) => {
  // 100%
  if (progress >= 100) {
    return {
      first: "오늘의 에듀게이지는",
      second: "100%!!!!",
    };
  }

  // 70% 이상
  if (progress >= 70) {
    return {
      first: "에듀게이지 100이 눈앞에 있어요!",
      second: "다음에는 더더더 화이팅~",
    };
  }

  // 30% 이상
  if (progress >= 30) {
    return {
      first: "아직 게이지를 다 채우지 못했어요...",
      second: "좀 더 열심히 해볼까요~?",
    };
  }

  // 0% 이상
  return {
    first: "차근차근 하나씩",
    second: "도전해보아요!",
  };
};

/* =====================================================
   시간 포맷
   ===================================================== */

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

/* =====================================================
   Modal
   ===================================================== */

export default function CalendarRecordModal({
  visible,
  record,
  onClose,
}: Props) {
  if (!record) {
    return null;
  }

  const progress = Math.min(
    Math.max(record.progress, 0),
    100
  );

  const currentCharacter = getCharacter(progress);
  const message = getRecordMessage(progress);

  const isCompleted = progress >= 100;

  return (
    <Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={onClose}
>
  <View style={styles.overlay}>

    {/* 바깥 배경 */}
    <Pressable
      style={StyleSheet.absoluteFillObject}
      onPress={onClose}
    />

    {/* 모달 본체 */}
    <View style={styles.modalCard}>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps="handled"
        overScrollMode="always"
      >

        {/* =================================================
            날짜
           ================================================= */}

        <Text style={styles.dateText}>
          {record.date}
        </Text>

        {/* =================================================
            첫 번째 화면
           ================================================= */}

        {isCompleted ? (
          <View style={styles.completedSection}>

            {/* 인증샷 */}
            <View style={styles.photoArea}>
              {record.photoUri ? (
                <Image
                  source={{
                    uri: record.photoUri,
                  }}
                  style={styles.photoImage}
                  resizeMode="cover"
                />
              ) : (
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
              )}

              {/* 인증샷 시간 */}
              <Text style={styles.photoTime}>
                {formatTime(
                  record.elapsedSeconds
                )}
              </Text>

              {/* 로고 */}
              <Image
                source={logoBack}
                style={styles.logoImage}
                resizeMode="contain"
              />

              {/* 인증샷 게이지 */}
              <View
                style={styles.photoGauge}
              >
                <View
                  style={[
                    styles.photoGaugeFill,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />
              </View>

              {/* 캐릭터 */}
              <Image
                source={currentCharacter}
                style={
                  styles.photoCharacter
                }
                resizeMode="contain"
              />
            </View>

            {/* 100% 문구 */}
            <View
              style={
                styles.completedMessage
              }
            >
              <Text
                style={
                  styles.completedMessageText
                }
              >
                {message.first}
              </Text>

              <Text
                style={
                  styles.completedMessageText
                }
              >
                {message.second}
              </Text>
            </View>

          </View>
        ) : (
          <View style={styles.normalSection}>

            {/* 문구 */}
            <View style={styles.messageArea}>
              <Text
                style={styles.messageText}
              >
                {message.first}
              </Text>

              <Text
                style={styles.messageText}
              >
                {message.second}
              </Text>
            </View>

            {/* 캐릭터 */}
            <View
              style={styles.characterArea}
            >
              <Image
                source={currentCharacter}
                style={
                  styles.largeCharacter
                }
                resizeMode="contain"
              />
            </View>

          </View>
        )}

        {/* =================================================
            두 번째 화면
           ================================================= */}

        <View style={styles.recordSection}>

          {/* 이 날의 GAUGE */}
          <View
            style={styles.firstGaugeArea}
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
                    width: `${progress}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* 시간 */}
          <Text style={styles.timeText}>
            {formatTime(
              record.elapsedSeconds
            )}
          </Text>

          {/* TODO */}
          <View style={styles.todoList}>
            {record.todos.map((todo) => (
              <View
                key={todo.id}
                style={styles.todoCard}
              >

                {/* 카테고리 */}
                <View
                  style={styles.todoHeader}
                >
                  <Text
                    style={
                      styles.todoCategory
                    }
                  >
                    {todo.category}
                  </Text>
                </View>

                {/* TODO 내용 */}
                <View
                  style={styles.todoBody}
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

                  {/* 체크 */}
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
            ))}
          </View>

        </View>

      </ScrollView>
    </View>
  </View>
</Modal>
  );
}


const styles = StyleSheet.create({
  /* ---------------------------------------------------------
     전체 Modal
     --------------------------------------------------------- */

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  modalCard: {
    width: "100%",
    height: "88%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
  },

  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },

  /* ---------------------------------------------------------
     날짜
     --------------------------------------------------------- */

  dateText: {
    color: "#10243A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 18,
    paddingBottom: 16,
  },

  /* =========================================================
     100% 화면
     ========================================================= */

  completedSection: {
    width: "100%",
  },

  /* ---------------------------------------------------------
     인증샷
     정사각형
     --------------------------------------------------------- */

  photoArea: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
    backgroundColor: "#B7B7B7",
    overflow: "hidden",
  },

  photoImage: {
    width: "100%",
    height: "100%",
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

  /* 인증샷 좌측 상단 시간 */

  photoTime: {
    position: "absolute",
    top: 16,
    left: 16,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  /* 인증샷 우측 상단 로고 */

  logoImage: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 82,
    height: 28,
  },

  /* ---------------------------------------------------------
     인증샷 안쪽 게이지
     --------------------------------------------------------- */

  photoGauge: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    height: 26,
    borderRadius: 14,
    backgroundColor: "#F2EED3",
    overflow: "hidden",
    marginHorizontal: 12,
    
  },

  photoGaugeFill: {
    height: "100%",
    backgroundColor: "#E9CB39",
    borderRadius: 14,
  },

  /* ---------------------------------------------------------
     인증샷 안쪽 캐릭터

     게이지 바로 위에 붙이지 않고
     게이지와 적당한 간격을 둠
     --------------------------------------------------------- */

  photoCharacter: {
    position: "absolute",
    left: 28,
    bottom: 58,
    width: 62,
    height: 62,
    zIndex: 5,
  },

  /* ---------------------------------------------------------
     100% 문구
     --------------------------------------------------------- */

  completedMessage: {
    minHeight: 145,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  completedMessageText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },

  /* =========================================================
     70 / 30 / 0 화면
     ========================================================= */

  normalSection: {
    width: "100%",
  },

  /* ---------------------------------------------------------
     문구
     --------------------------------------------------------- */

  messageArea: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  messageText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },

  /* ---------------------------------------------------------
     캐릭터

     프로토타입 record1처럼
     문구 아래에 충분한 공간을 두고 배치
     --------------------------------------------------------- */

  characterArea: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },

  largeCharacter: {
    width: 155,
    height: 155,
  },

  /* ---------------------------------------------------------
     첫 화면의 GAUGE
     --------------------------------------------------------- */

  firstGaugeArea: {
    paddingHorizontal: 30,
    paddingBottom: 35,
  },

  gaugeTitle: {
    color: "#10243A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  /* =========================================================
     record2 - 기록 상세
     ========================================================= */

  recordSection: {
    paddingTop: 0,
    paddingHorizontal: 18,
  },

  recordGaugeTitle: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  /* ---------------------------------------------------------
     공통 Gauge
     --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     시간
     --------------------------------------------------------- */

  timeText: {
    color: "#E9CB39",
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 38,
    marginBottom: 42,
  },

  /* ---------------------------------------------------------
     TODO
     --------------------------------------------------------- */

  todoList: {
    gap: 14,
  },

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

  todoCategory: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  todoBody: {
    minHeight: 70,
    paddingHorizontal: 16,
    paddingTop: 18,
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

  scrollView: {
   flex: 1,
   width: "100%",
  },


});