import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Todo {
  id: string;
  title: string;
  category: string;
  repeat: string;
  repeatEnd: string;
  checked: boolean;
}

interface ManageCardProps {
  category: string;
  todos: Todo[];
  onAlter: (todo: Todo) => void;
  onAddTodo: () => void;
}

export default function ManageCard({
  category,
  todos,
  onAlter,
  onAddTodo,
}: ManageCardProps) {
  return (
    <View style={styles.card}>

      <View style={styles.categoryHeader}>
        <Text style={styles.categoryText}>
          {category}
        </Text>
      </View>

      <View style={styles.todoContainer}>

        {todos.map((todo) => (
          <View
            key={todo.id}
            style={styles.todoRow}
          >

            <Text
              numberOfLines={1}
              style={styles.todoText}
            >
              {todo.title}
            </Text>

            <Pressable
              onPress={() =>
                onAlter(todo)
              }
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#FFFFFF"
              />
            </Pressable>

          </View>
        ))}

        <Pressable
          style={styles.addButton}
          onPress={onAddTodo}
        >

          <Ionicons
            name="add"
            size={18}
            color="#10243A"
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
    marginTop: 38,
    marginBottom: 24,
    position: "relative",
  },

  categoryHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 42,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      {
        translateY: -18,
      },
    ],
    zIndex: 100,
  },

  categoryText: {
    color: "#10243A",
    fontSize: 16,
    fontWeight: "700",
  },

  todoContainer: {
    backgroundColor: "#5B6875",
    borderRadius: 18,
    paddingTop: 34,
    paddingBottom: 18,
  },

  todoRow: {
    height: 44,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  todoText: {
    flex: 1,
    color: "#FFFFFF",
    marginRight: 12,
  },

  addButton: {
    alignSelf: "center",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6D64A",
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 36,
  },

  addText: {
    color: "#10243A",
    fontWeight: "700",
    marginLeft: 4,
  },

});