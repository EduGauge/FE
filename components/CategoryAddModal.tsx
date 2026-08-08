import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface CategoryAddModalProps {
  visible: boolean;
  categories: string[];
  onClose: () => void;
  onAdd: (category: string) => void;
}

export default function CategoryAddModal({
  visible,
  categories,
  onClose,
  onAdd,
}: CategoryAddModalProps) {
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (visible) {
      setCategory("");
      setErrorMessage("");
    }
  }, [visible]);

  const handleAdd = () => {
    const value = category.trim();

    if (value === "") {
      setErrorMessage("카테고리를 입력해주세요.");
      return;
    }

    if (value.length > 8) {
      setErrorMessage(
        "카테고리는 최대 8글자까지 입력할 수 있습니다."
      );
      return;
    }

    if (
      categories.some(
        (item) =>
          item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setErrorMessage(
        "이미 존재하는 카테고리입니다."
      );
      return;
    }

    if (categories.length >= 6) {
      setErrorMessage(
        "카테고리는 최대 6개까지 생성할 수 있습니다."
      );
      return;
    }

    onAdd(value);

    setCategory("");
    setErrorMessage("");

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>
            카테고리 추가
          </Text>

          <TextInput
            style={styles.input}
            placeholder="카테고리 입력"
            placeholderTextColor="#CFCFCF"
            value={category}
            maxLength={8}
            autoCapitalize="none"
            onChangeText={(text) => {
              setCategory(text);
              setErrorMessage("");
            }}
          />

          {errorMessage !== "" && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color="#FFFFFF"
              />

              <Text style={styles.errorText}>
                {errorMessage}
              </Text>

            </View>
          )}

          <View style={styles.buttonRow}>

            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>
                취소
              </Text>
            </Pressable>

            <Pressable
              style={styles.addButton}
              onPress={handleAdd}
            >
              <Text style={styles.addText}>
                추가
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
    marginBottom: 24,
  },

  input: {
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7C8792",
    paddingHorizontal: 20,
    color: "#FFFFFF",
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginLeft: 5,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },

  cancelButton: {
    width: "47%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7C8792",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  addButton: {
    width: "47%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#10243A",
    fontSize: 16,
    fontWeight: "600",
  },

});
