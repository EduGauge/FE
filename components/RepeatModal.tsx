import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface RepeatModalProps {
  visible: boolean;
  selected: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

const repeatOptions = [
  "없음",
  "매일",
  "주",
  "월",
];

export default function RepeatModal({
  visible,
  selected,
  onClose,
  onSelect,
}: RepeatModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>

        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        <View style={styles.container}>

          <Text style={styles.title}>
            반복 선택
          </Text>

          {repeatOptions.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.option,
                selected === item &&
                  styles.selectedOption,
              ]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selected === item &&
                    styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              닫기
            </Text>
          </Pressable>

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
    width: "85%",
    backgroundColor: "#10243A",
    borderRadius: 20,
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24, 
  },

  option: {
    height: 52,
    backgroundColor: "#7C8792",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  selectedOption: {
    backgroundColor: "#FFFFFF",
  },

  optionText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  selectedText: {
    color: "#10243A",
    fontWeight: "700",
  },

  closeButton: {
    marginTop: 10,
    height: 50,
    backgroundColor: "#7C8792",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

});
