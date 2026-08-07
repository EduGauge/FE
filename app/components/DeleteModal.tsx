import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  visible,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.message}>
            삭제하면 작성한 리스트를 다시는 볼 수 없어요!{"\n"}
            진짜로 삭제하시겠습니까?
          </Text>

          <View style={styles.buttonRow}>

            <Pressable
              style={styles.button}
              onPress={onDelete}
            >
              <Text style={styles.deleteText}>
                삭제
              </Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>
                취소
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

  modal: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
  },

  message: {
    textAlign: "center",
    color: "#10243A",
    lineHeight: 24,
  },

  buttonRow: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  button: {
    paddingHorizontal: 30,
    paddingVertical: 8,
  },

  deleteText: {
    color: "#10243A",
    fontWeight: "700",
  },

  cancelText: {
    color: "#7C8792",
    fontWeight: "700",
  },

});