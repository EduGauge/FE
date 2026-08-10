import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

import { Todo } from "../../context/TodoContext";

interface ManageCardProps {
  category: string;
  todos: Todo[];
  isSelected: boolean;
  onSelect: () => void;
  onCheck: (id: string) => void;
  onAddTodo: (title: string) => void;
}

export default function ManageCard({
  category,
  todos,
  isSelected,
  onSelect,
  onCheck,
  onAddTodo,
}: ManageCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAddTodo = () => {
    const title = newTitle.trim();
    if (!title) return;

    onAddTodo(title);
    setNewTitle("");
    setIsAdding(false);
  };

  return (
    <View
      style={[
        styles.card,
        isSelected && styles.selectedCard,
      ]}
    >
      {/* 카테고리 */}
      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          selected: isSelected,
        }}
        onPress={onSelect}
        style={({ pressed }) => [
          styles.categoryHeader,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.categoryTitleRow}>
          <Text style={styles.categoryText}>
            {category}
          </Text>
        </View>
      </Pressable>

      {/* 할 일 목록 */}
      <View style={styles.todoContainer}>
        {todos.map((todo) => (
          <View
            key={todo.id}
            style={styles.todoRow}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.todoText,
                todo.checked && styles.checkedText,
              ]}
            >
              {todo.title}
            </Text>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{
                checked: todo.checked,
              }}
              hitSlop={10}
              onPress={() =>
                onCheck(todo.id)
              }
            >
              {todo.checked ? (
                <View
                  style={styles.checkedCircle}
                >
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#10243A"
                  />
                </View>
              ) : (
                <Ionicons
                  name="ellipse-outline"
                  size={15}
                  color="#FFFFFF"
                />
              )}
            </Pressable>
          </View>
        ))}

        {isAdding ? (
          <View style={styles.todoRow}>
            <TextInput
              autoFocus
              value={newTitle}
              onChangeText={setNewTitle}
              onSubmitEditing={handleAddTodo}
              placeholder="리스트 이름을 입력하세요"
              placeholderTextColor="#B8C0C6"
              returnKeyType="done"
              style={styles.todoInput}
            />

            <Pressable
              disabled={!newTitle.trim()}
              hitSlop={10}
              onPress={handleAddTodo}
              style={!newTitle.trim() && styles.disabled}
            >
              <Ionicons
                name="ellipse-outline"
                size={15}
                color="#FFFFFF"
              />
            </Pressable>

          </View>
        ) : null}

        {/* 리스트 추가 */}
        <Pressable
          style={styles.addButton}
          onPress={() => setIsAdding(true)}
        >
          <Image
            source={require("../../assets/icons/plus2.png")}
            style={styles.addIcon}
            resizeMode="contain"
          />

          <Text style={styles.addText}>
            리스트 추가
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    marginBottom: 24,
    position: "relative",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 20,
  },

  selectedCard: {
    borderColor: "#E3C943",
  },

  categoryHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 36,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  categoryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryText: {
    color: "#071F30",
    fontSize: 16,
    fontWeight: "500",
  },

  todoContainer: {
    backgroundColor: "#455764",
    borderRadius: 18,
    paddingTop: 36,
    paddingBottom: 10,
  },

  todoRow: {
    height: 42,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  todoText: {
    flex: 1,
    color: "#FFFFFF",
    marginRight: 10,
  },

  checkedText: {
    color: "#E3C943",
    textDecorationLine: "line-through",
    textDecorationColor: "#E3C943",
  },

  todoInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 0,
    color: "#FFFFFF",
    fontSize: 14,
  },

  checkedCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#F6D64A",
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    alignSelf: "center",
    height: 22,
    marginTop: 11,
    marginBottom: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: "#F6D64A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addIcon: {
    width: 12,
    height: 12,
  },

  addText: {
    marginLeft: 7,
    color: "#10243A",
    fontSize: 10,
    fontWeight: "500",
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.4,
  },

});
