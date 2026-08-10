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
            size={15}
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
    marginTop: 14,
    marginBottom: 22,
    position: "relative",
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
    textDecorationColor: "F6D64A",
  },

  checkedCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#F6D64A",
    justifyContent: "center",
    alignItems: "center",
  },
});
