import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCategories } from "../context/CategoryContext";
import { useTodos } from "../context/TodoContext";

import CategoryAddModal from "../components/CategoryAddModal";
import ManageCard from "../components/ManageCard";

interface Todo {
  id: string;
  title: string;
  category: string;
  repeat: string;
  repeatEnd: string;
  checked: boolean;
}

export default function ManageScreen() {

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  const {todos} = useTodos();

  const {categories, addCategory} = useCategories();

  const groupedTodos = useMemo(() => {

    return todos.reduce(
      (acc, todo) => {

        if (!acc[todo.category]) {
          acc[todo.category] = [];
        }

        acc[todo.category].push(todo);

        return acc;

      },
      {} as Record<string, Todo[]>
    );

  }, [todos]);

  const handleAddCategory = (
    category: string
  ) => {

   addCategory(category);

  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Pressable
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.title}>
          리스트 관리
        </Text>

        <View style={styles.headerRight}>

          <Pressable
            onPress={() =>
              router.push("/profile")
            }
          >
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            style={{ marginLeft: 12 }}
            onPress={() =>
              router.push("/notification")
            }
          >
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color="#FFFFFF"
            />
          </Pressable>

        </View>

      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {Object.entries(groupedTodos).map(
          ([category, items]) => (

            <ManageCard
              key={category}
              category={category}
              todos={items}
              onAlter={(todo) =>
                router.push({
                  pathname: "/list/alter",
                  params: {
                    id: todo.id,
                    title: todo.title,
                    category: todo.category,
                    repeat: todo.repeat,
                    repeatEnd: todo.repeatEnd,
                  },
                })
              }
              onAddTodo={() =>
                router.push({
                  pathname: "/list/create",
                  params: {
                    category,
                  },
                })
              }
            />

          )
        )}

      </ScrollView>

      <Pressable
        style={styles.newCategoryButton}
        onPress={() =>
          router.push({
            pathname: "/list/create",
            params:{
              mode: "newCategory",
            }
          })
        }
      >

        <Ionicons
          name="add"
          size={20}
          color="#F6D64A"
        />

        <Text style={styles.newCategoryText}>
          새 카테고리 만들기
        </Text>

      </Pressable>

      <CategoryAddModal
        visible={showCategoryModal}
        categories={categories}
        onClose={() =>
          setShowCategoryModal(false)
        }
        onAdd={handleAddCategory}
      />

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

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    marginTop: 16,
    height: 1,
    backgroundColor: "#415366",
  },

  scroll: {
    flex: 1,
    marginTop: 18,
    paddingHorizontal: 24,
  },

  newCategoryButton: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  newCategoryText: {
    marginLeft: 6,
    color: "#F6D64A",
    fontSize: 15,
    fontWeight: "700",
  },

});