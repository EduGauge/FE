import { MaterialIcons } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

interface Props {
  visible: boolean;
  categories: string[];
  selectedCategory: string;
  onClose: () => void;
  onSelect: (category: string) => void;
  onDelete: (category: string) => void;
  onAdd: () => void;
}

export default function CategorySelectModal({
  visible,
  categories,
  selectedCategory,
  onClose,
  onSelect,
  onDelete,
  onAdd,
}: Props) {
  

  const handleDelete = (category: string) => {
    onDelete(category);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.container}>

            <Text style={styles.title}>
              카테고리 선택
            </Text>

            {categories.map((item) => (
              <View
                key={item}
                style={styles.row}
              >
                <Pressable
                  style={[
                    styles.categoryButton,
                    selectedCategory === item &&
                      styles.selectedButton,
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item &&
                        styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    handleDelete(item)
                  }
                >
                  <MaterialIcons
                    name="close"
                    size={22}
                    color="#FFFFFF"
                  />
                </Pressable>

              </View>
            ))}

            <Pressable
              style={styles.addButton}
              onPress={onAdd}
            >
              <MaterialIcons
                name="add"
                size={22}
                color="#FFFFFF"
              />

              <Text style={styles.addText}>
                카테고리 추가
              </Text>
            </Pressable>

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

      
    </>
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  categoryButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#7C8792",
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 18,
    marginRight: 10,
  },

  selectedButton: {
    backgroundColor: "#FFFFFF",
  },

  categoryText: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  selectedText: {
    color: "#10243A",
    fontWeight: "700",
  },

  addButton: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#FFFFFF",
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 15,
  },

  closeButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7C8792",
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  snackbar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 40,
    backgroundColor: "#333333",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },

  snackbarText: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
  },

  undoText: {
    color: "#9F82FF",
    fontWeight: "700",
    marginLeft: 16,
  },

});