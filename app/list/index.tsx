import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTodos } from "../context/TodoContext";

import ListCard from "../components/ListCard";


export default function ListScreen() {

  const {todos, updateTodo} = useTodos();

  const groupedTodos = useMemo(() => {

    return todos.reduce(
      (acc, todo) => {

        if (!acc[todo.category]) {

          acc[todo.category] = [];

        }

        acc[todo.category].push(todo);

        return acc;

      },
      {} as Record<string, typeof todos>
    );

  }, [todos]);

  const checkedCount = todos.filter(
    (todo) => todo.checked
  ).length;

  const progress =
    todos.length === 0
      ? 0
      : (checkedCount / todos.length) * 100;

  const handleCheck = (id: string) => {

    const todo = todos.find(
    (item) => item.id === id
   );

     if (!todo) return;

      updateTodo({
        ...todo,
        checked: !todo.checked,
     });

    };

    return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.logo}>
          LOGO
        </Text>

        <View style={styles.headerRight}>

          <Pressable
            onPress={() =>
              router.push("/profile")
            }
          >
            <Ionicons
              name="person-circle-outline"
              size={30}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            style={styles.menuButton}
            onPress={() =>
              router.push("/notification")
            }
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="#FFFFFF"
            />
          </Pressable>

        </View>

      </View>

      <View style={styles.divider} />

      <Text style={styles.totalLabel}>
        총 시간
      </Text>

      <Text style={styles.totalTime}>
        00:00
      </Text>

      <View style={styles.progressBackground}>

        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
            },
          ]}
        />

      </View>

      <View style={styles.listHeader}>

        <Text style={styles.listTitle}>
          리스트
        </Text>

        <Pressable
          onPress={() =>
            router.push("/list/manage")
          }
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>

      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {Object.entries(groupedTodos).map(
          ([category, items]) => (

            <ListCard
              key={category}
              category={category}
              todos={items}
              onCheck={handleCheck}
            />

          )
        )}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  header: {
    marginTop: 55,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#F6D64A",
    fontSize: 22,
    fontWeight: "700",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginLeft: 12,
  },

  divider: {
    marginTop: 16,
    height: 1,
    backgroundColor: "#415366",
  },

  totalLabel: {
    marginTop: 30,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
  },

  totalTime: {
    marginTop: 10,
    color: "#F6D64A",
    textAlign: "center",
    fontSize: 56,
    fontWeight: "700",
  },

  progressBackground: {
    marginTop: 22,
    marginHorizontal: 24,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#55613A",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#F6D64A",
    borderRadius: 10,
  },

  listHeader: {
    marginTop: 32,
    marginHorizontal: 24,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },

});