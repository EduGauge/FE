import { Ionicons } from "@expo/vector-icons";
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TimerFinishScreen() {
  const params = useLocalSearchParams<{
    elapsed?: string;
  }>();

  const elapsedSeconds = Number(
    params.elapsed ?? 0
  );

  const [showModal, setShowModal] =
    React.useState(true);

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

  const handleCamera = () => {
    setShowModal(false);

    router.push("/camera");
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

          <Ionicons
            name="person-circle"
            size={28}
            color="#7C8792"
          />

          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color="#7C8792"
            style={styles.menuButton}
          />

        </View>

      </View>

      {/* 시간 */}

      <Text style={styles.timeText}>
        {formatTime(elapsedSeconds)}
      </Text>

      {/* 완료 */}

      <View style={styles.categoryCard}>

        <View style={styles.categoryHeader}>
          <Text style={styles.categoryText}>
            운동
          </Text>
        </View>

        <View style={styles.todoContainer}>

          <View style={styles.todoRow}>

            <Text style={styles.todoText}>
              리스트를 모두 완료했습니다.
            </Text>

            <View style={styles.checkCircle}>
              <Ionicons
                name="checkmark"
                size={15}
                color="#10243A"
              />
            </View>

          </View>

        </View>

      </View>

      {/* 100% */}

      <View style={styles.bottomArea}>

        <View
          style={styles.progressBackground}
        >

          <View style={styles.progressBar} />

        </View>

        <Text style={styles.progressText}>
          100%
        </Text>

        <View style={styles.timerButton}>

          <Text style={styles.pauseText}>
            Ⅱ
          </Text>

        </View>

      </View>

      {/* 모달 */}

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modal}>

            <Text style={styles.modalText}>
              에듀게이지 100% 달성을
              축하드립니다!
            </Text>

            <Text style={styles.modalText}>
              인증 사진을 촬영하시겠습니까?
            </Text>

            <View style={styles.modalButtons}>

              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false)
                  router.replace("/list");
                }}
              >
                <Text style={styles.cancelText}>
                  취소
                </Text>
              </Pressable>

              <Pressable
                style={styles.modalButton}
                onPress={handleCamera}
              >
                <Text style={styles.confirmText}>
                  확인
                </Text>
              </Pressable>

            </View>

          </View>

        </View>

      </Modal>

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

  timeText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },

  categoryCard: {
    marginHorizontal: 24,
    marginTop: 35,
  },

  categoryHeader: {
    height: 40,
    backgroundColor: "#8A8A8A",
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
    backgroundColor: "#303B43",
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
    color: "#6F7375",
    fontSize: 12,
  },

  checkCircle: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#7A6410",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 22,
    paddingHorizontal: 24,
  },

  progressBackground: {
    height: 12,
    backgroundColor: "#45451E",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressBar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#756514",
  },

  progressText: {
    color: "#7A6410",
    textAlign: "center",
    marginTop: 5,
    fontSize: 11,
  },

  timerButton: {
    alignSelf: "center",
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#756514",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -28,
  },

  pauseText: {
    color: "#10243A",
    fontSize: 36,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 42,
  },

  modal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },

  modalText: {
    color: "#10243A",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 21,
  },

  modalButtons: {
    flexDirection: "row",
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },

  modalButton: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#777777",
    fontSize: 13,
  },

  confirmText: {
    color: "#10243A",
    fontSize: 13,
    fontWeight: "700",
  },
});