import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CancelModalProps {
  visible: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export default function CancelModal({
  visible,
  onContinue,
  onCancel,
}: CancelModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>

        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onContinue}
        />

        <View style={styles.container}>

          <Text style={styles.title}>
            취소하시겠습니까?
          </Text>

          <Text style={styles.description}>
            작성 중인 내용은 저장되지 않습니다.
          </Text>

          <View style={styles.buttonRow}>

            <Pressable
              style={styles.continueButton}
              onPress={onContinue}
            >
              <Text style={styles.continueText}>
                계속 작성
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>
                취소하기
              </Text>
            </Pressable>

          </View>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "86%",
    backgroundColor: "#10243A",
    borderRadius: 20,
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    color: "#D9D9D9",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  continueButton: {
    width: "47%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7C8792",
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  cancelButton: {
    width: "47%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#10243A",
    fontSize: 16,
    fontWeight: "600",
  },

});