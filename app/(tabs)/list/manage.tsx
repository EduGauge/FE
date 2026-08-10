import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DeleteModal from "../../../components/DeleteModal";
import ManageCard from "../../../components/list/ManageCard";
import { useCategories } from "../../../context/CategoryContext";
import {
  useTodos,
} from "../../../context/TodoContext";

export default function ManageListScreen() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodosByCategory,
  } = useTodos();
  const { categories, deleteCategory } = useCategories();

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState(false);

  const groupedTodos = useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [
          category.id,
          todos.filter((todo) => todo.categoryId === category.id),
        ])
      ),
    [categories, todos]
  );

  const openListForm = () =>
    router.push("/list/addCategory");

  const handleAddTodo = (
    categoryId: string,
    title: string
  ) => {
    addTodo({
      id: `${Date.now()}-${Math.random()}`,
      title,
      categoryId,
      checked: false,
    });
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(
      (item) => item.id === id
    );

    if (todo) {
      updateTodo({
        ...todo,
        checked: !todo.checked,
      });
    }
  };

  const handleDelete = () => {
    if (!selectedCategoryId) return;

    deleteTodosByCategory(selectedCategoryId);
    deleteCategory(selectedCategoryId);
    setSelectedCategoryId(null);
    setIsDeleteModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {categories.map(
          (category) => (
            <ManageCard
              key={category.id}
              category={category.name}
              todos={groupedTodos[category.id] ?? []}
              isSelected={
                selectedCategoryId === category.id
              }
              onSelect={() =>
                setSelectedCategoryId(
                  (current) =>
                    current === category.id
                      ? null
                      : category.id
                )
              }
              onCheck={handleToggleTodo}
              onAddTodo={(title) =>
                handleAddTodo(category.id, title)
              }
            />
          )
        )}

        {/* 카테고리 추가 */}
        <Pressable
          style={styles.addCategoryButton}
          onPress={openListForm}
        >
          <Image
            source={require("../../../assets/icons/plus2.png")}
            style={styles.addCategoryIcon}
            resizeMode="contain"
          />

          <Text style={styles.addCategoryText}>
            카테고리 추가
          </Text>
        </Pressable>

        {selectedCategoryId ? (
        <View style={styles.splitActions}>
          <Pressable
            onPress={() => setIsDeleteModalVisible(true)}
            style={styles.footerButton}
          >
            <Text style={styles.footerText}>
              삭제
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/list/addCategory",
                params: { mode: "edit", categoryId: selectedCategoryId },
              })
            }
            style={styles.footerButton}
          >
            <Text style={styles.footerText}>
              수정
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.defaultActions}>
          <Pressable
            onPress={() => router.replace("/list")}
            style={styles.footerButton}
          >
            <Text style={styles.submitText}>
              등록하기
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/list")}
            style={styles.footerButton}
          >
            <Text style={styles.footerText}>
              취소
            </Text>
          </Pressable>
        </View>
        )}
      </ScrollView>

      <DeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#071F30",
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 28,
  },

  addCategoryButton: {
    height: 36,
    marginTop: 4,
    borderRadius: 21,
    backgroundColor: "#E3C943",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addCategoryIcon: {
    width: 16,
    height: 16,
  },

  addCategoryText: {
    marginLeft: 12,
    color: "#071F30",
    fontSize: 13,
    fontWeight: "500",
  },

  defaultActions: {
    minHeight: 138,
    marginTop: 36,
    paddingBottom: 12,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  splitActions: {
    minHeight: 100,
    marginTop: 36,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  footerButton: {
    minWidth: 72,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  submitText: {
    color: "#F6D64A",
    fontSize: 13,
    fontWeight: "600",
  },
});
