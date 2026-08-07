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
  checked: boolean;
}

interface ListCardProps {
  category: string;
  todos: Todo[];
  onCheck: (id: string) => void;
}

export default function ListCard({
  category,
  todos,
  onCheck,
}: ListCardProps) {
  return (
    <View style={styles.card}>

      <View style={styles.categoryHeader}>

        <Text style={styles.categoryText}>
          {category}
        </Text>

      </View>

      <View style={styles.todoContainer}>

        {todos.map((todo, index) => (

          <View key={todo.id}>

            <View style={styles.todoRow}>

              <Text
                numberOfLines={1}
                style={[
                  styles.todoText,
                  todo.checked &&
                    styles.checkedText,
                ]}
              >
                {todo.title}
              </Text>

              <Pressable
                onPress={() => onCheck(todo.id)}
              >
                {todo.checked ? (

                <View style={styles.checkedCircle}>

                 <Ionicons
                    name="checkmark"
                    size={14}
                    color="#10243A"
                 />

            </View>

        ) : (

         <Ionicons
            name="ellipse-outline"
            size={22}
            color="#FFFFFF"
        />

            )}
              </Pressable>

            </View>

          </View>

        ))}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    marginTop: 38,
    marginBottom: 22,
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
    color: "#F6D64A",
    textDecorationLine: "line-through",
    textDecorationColor: "F6D64A",
  },

  checkedCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F6D64A",
    justifyContent: "center",
    alignItems: "center",
  },
});