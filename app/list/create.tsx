import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
<<<<<<< HEAD
import { useCategories } from "../../context/CategoryContext";
import { useTodos } from "../../context/TodoContext";

import CancelModal from "../../components/CancelModal";
import CategorySelectModal from "../../components/CategorySelectModal";
import RepeatModal from "../../components/RepeatModal";

=======

import CancelModal from "../components/CancelModal";
import RepeatModal from "../components/RepeatModal";
import { useCategories } from "../context/CategoryContext";
import { useTodos } from "../context/TodoContext";

>>>>>>> 4a9915e (feat: 캘린더 탭 수정중)
export default function CreateList() {
  const { addTodo } = useTodos();

  const {
    categories,
    addCategory,
    deleteCategory,
  } = useCategories();

  const [listName, setListName] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [repeat, setRepeat] =
    useState("없음");

  const [repeatEnd, setRepeatEnd] =
    useState("없음");

  const [date, setDate] =
    useState(new Date());

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  const [showCategoryAddModal, setShowCategoryAddModal] =
    useState(false);

  const [showRepeatModal, setShowRepeatModal] =
    useState(false);

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [isListNameFocused, setIsListNameFocused] =
    useState(false);

  const [newCategoryName, setNewCategoryName] =
    useState("");

  const isValid =
    listName.trim() !== "" &&
    selectedCategory !== "";

  const handleCreate = () => {
    if (!isValid) {
      return;
    }

    addTodo({
      id: Date.now().toString(),
      title: listName.trim(),
      category: selectedCategory,
      repeat,
      repeatEnd,
      checked: false,
    });

    router.replace("/list");
  };

  const handleDeleteCategory = (
    category: string
  ) => {
    deleteCategory(category);

    if (selectedCategory === category) {
      setSelectedCategory("");
    }
  };

  const handleOpenCategoryAddModal = () => {
    setNewCategoryName("");
    setShowCategoryAddModal(true);

  const handleCloseCategoryAddModal = () => {
    setNewCategoryName("");
    setShowCategoryAddModal(false);
  };

  const handleAddCategory = () => {
    const categoryName =
      newCategoryName.trim();

    if (categoryName === "") {
      return;
    }

    // 이미 존재하는 카테고리라면 추가하지 않음
    if (categories.includes(categoryName)) {
      return;
    }

    addCategory(categoryName);

    // 새로 만든 카테고리를
    // 현재 리스트의 카테고리로 선택
    setSelectedCategory(categoryName);

    // 입력 초기화
    setNewCategoryName("");

    // 카테고리 추가 모달 닫기
    setShowCategoryAddModal(false);
  };

  return (
    <View style={styles.container}>

      {/* =========================
          헤더
      ========================= */}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() =>
            setShowCancelModal(true)
          }
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          리스트 생성
        </Text>

      </View>

  

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >


        <View
          style={styles.listNameSection}
        >

          <View
            style={styles.inputContainer}
          >

            <Text
              style={styles.inputLabel}
            >
              리스트명
            </Text>

            <TextInput
              style={[
                styles.input,
                !isListNameFocused &&
                  listName !== "" &&
                  styles.inputRight,
              ]}
              placeholder=""
              value={listName}
              maxLength={20}
              onFocus={() =>
                setIsListNameFocused(true)
              }
              onBlur={() =>
                setIsListNameFocused(false)
              }
              onChangeText={setListName}
            />

          </View>

          <Text style={styles.countText}>
            {listName.length}/20
          </Text>

        </View>


        <Pressable
          style={styles.inputContainer}
          onPress={() =>
            setShowCategoryModal(true)
          }
        >

          <Text
            style={styles.inputLabel}
          >
            카테고리
          </Text>

          <Text
            style={[
              styles.selectText,
              selectedCategory === "" &&
                styles.placeholder,
            ]}
          >
            {selectedCategory || "선택"}
          </Text>

          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#FFFFFF"
          />

        </Pressable>

        

        <Pressable
          style={[
            styles.inputContainer,
            styles.sectionSpacing,
          ]}
          onPress={() =>
            setShowRepeatModal(true)
          }
        >

          <Text
            style={styles.inputLabel}
          >
            반복
          </Text>

          <Text
            style={styles.selectText}
          >
            {repeat}
          </Text>

          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#FFFFFF"
          />

        </Pressable>


        <Pressable
          style={[
            styles.inputContainer,
            styles.sectionSpacing,
          ]}
          onPress={() => {
            if (repeat === "없음") {
              return;
            }

            setShowDatePicker(true);
          }}
        >

          <Text
            style={styles.inputLabel}
          >
            반복종료
          </Text>

          <Text
            style={[
              styles.selectText,
              repeatEnd !== "없음" &&
                styles.placeholder,
            ]}
          >
            {repeatEnd}
          </Text>

          <MaterialIcons
            name="calendar-month"
            size={22}
            color="#FFFFFF"
          />

        </Pressable>

       

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={
              Platform.OS === "ios"
                ? "inline"
                : "default"
            }
            onChange={(
              event,
              selectedDate
            ) => {
              setShowDatePicker(false);

              if (selectedDate) {
                setDate(selectedDate);

                setRepeatEnd(
                  selectedDate.toLocaleDateString(
                    "ko-KR"
                  )
                );
              }
            }}
          />
        )}

      </ScrollView>

      

      <Pressable
        style={[
          styles.createButton,
          !isValid &&
            styles.disabledButton,
        ]}
        disabled={!isValid}
        onPress={handleCreate}
      >

        <Text
          style={[
            styles.createButtonText,
            !isValid &&
              styles.disabledButtonText,
          ]}
        >
          등록하기
        </Text>

      </Pressable>

      {/* =================================================
          1. 카테고리 선택 모달
      ================================================= */}

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowCategoryModal(false)
        }
      >

        <View
          style={styles.categoryModalOverlay}
        >

          <View
            style={styles.categoryModal}
          >

            

            <Text
              style={
                styles.categoryModalTitle
              }
            >
              카테고리 선택
            </Text>

           
            <ScrollView
              style={
                styles.categoryList
              }
              showsVerticalScrollIndicator={
                false
              }
            >

              {categories.map(
                (category) => (
                  <View
                    key={category}
                    style={
                      styles.categoryRow
                    }
                  >

                    <Pressable
                      style={
                        styles.categoryItem
                      }
                      onPress={() => {
                        setSelectedCategory(
                          category
                        );

                        setShowCategoryModal(
                          false
                        );
                      }}
                    >

                      <Text
                        style={
                          styles.categoryItemText
                        }
                      >
                        {category}
                      </Text>

                    </Pressable>

                    <Pressable
                      style={
                        styles.categoryDeleteButton
                      }
                      onPress={() =>
                        handleDeleteCategory(
                          category
                        )
                      }
                    >

                      <Ionicons
                        name="close"
                        size={24}
                        color="#FFFFFF"
                      />

                    </Pressable>

                  </View>
                )
              )}

            </ScrollView>

            {/* =========================
                카테고리 추가
            ========================= */}

            <Pressable
              style={
                styles.addCategoryButton
              }
              onPress={
                handleOpenCategoryAddModal
              }
            >

              <Text
                style={
                  styles.addCategoryText
                }
              >
                ＋ 카테고리 추가
              </Text>

            </Pressable>

          

            <Pressable
              style={
                styles.closeCategoryButton
              }
              onPress={() =>
                setShowCategoryModal(false)
              }
            >

              <Text
                style={
                  styles.closeCategoryText
                }
              >
                닫기
              </Text>

            </Pressable>

          </View>

        </View>

      </Modal>

      {/* =================================================
          2. 카테고리 추가 모달
      ================================================= */}

      <Modal
        visible={showCategoryAddModal}
        transparent
        animationType="fade"
        onRequestClose={
          handleCloseCategoryAddModal
        }
      >

        <View
          style={styles.categoryAddOverlay}
        >

          <View
            style={styles.categoryAddModal}
          >

           

            <Text
              style={
                styles.categoryAddTitle
              }
            >
              카테고리 추가
            </Text>

            

            <TextInput
              style={
                styles.categoryAddInput
              }
              value={newCategoryName}
              onChangeText={
                setNewCategoryName
              }
              maxLength={15}
              placeholder="카테고리명을 입력하세요"
              placeholderTextColor="#CFCFCF"
              autoFocus
            />

           

            <View
              style={
                styles.categoryAddActions
              }
            >

              <Pressable
                style={
                  styles.categoryAddCancelButton
                }
                onPress={
                  handleCloseCategoryAddModal
                }
              >

                <Text
                  style={
                    styles.categoryAddCancelText
                  }
                >
                  취소
                </Text>

              </Pressable>

              <Pressable
                style={[
                  styles.categoryAddConfirmButton,
                  newCategoryName.trim() ===
                    "" &&
                    styles.categoryAddDisabled,
                ]}
                disabled={
                  newCategoryName.trim() ===
                  ""
                }
                onPress={
                  handleAddCategory
                }
              >

                <Text
                  style={[
                    styles.categoryAddConfirmText,
                    newCategoryName.trim() === "" &&
                      styles.categoryAddDisabledText,
                  ]}
                >
                  추가
                </Text>

              </Pressable>

            </View>

          </View>

        </View>

      </Modal>

      {/* =========================
          반복 모달
      ========================= */}

      <RepeatModal
        visible={showRepeatModal}
        selected={repeat}
        onClose={() =>
          setShowRepeatModal(false)
        }
        onSelect={(value) => {
          setRepeat(value);

          if (value === "없음") {
            setRepeatEnd("없음");
          }
        }}
      />

      {/* =========================
          취소 모달
      ========================= */}

      <CancelModal
        visible={showCancelModal}
        onContinue={() =>
          setShowCancelModal(false)
        }
        onCancel={() => {
          setShowCancelModal(false);
          router.replace("/list");
        }}
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
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 180,
  },

  listNameSection: {
    marginBottom: 18,
  },

  inputContainer: {
    height: 55,
    backgroundColor: "#7C8792",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  inputLabel: {
    color: "#FFFFFF",
  },

  input: {
    flex: 1,
    marginLeft: 20,
    color: "#FFFFFF",
  },

  inputRight: {
    textAlign: "right",
  },

  countText: {
    color: "#CFCFCF",
    fontSize: 11,
    textAlign: "right",
    marginTop: 6,
  },

  selectText: {
    color: "#FFFFFF",
    marginLeft: "auto",
    marginRight: 6,
  },

  placeholder: {
    color: "#CFCFCF",
  },

  sectionSpacing: {
    marginTop: 18,
  },

  createButton: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 90,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    color: "#10243A",
    fontSize: 17,
    fontWeight: "700",
  },

  disabledButton: {
    backgroundColor: "#D9D9D9",
  },

  disabledButtonText: {
    color: "#A5A5A5",
  },

  categoryModalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

  categoryModal: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#102B47",
    borderRadius: 24,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },

  categoryModalTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 26,
  },

  categoryList: {
    maxHeight: 250,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  categoryItem: {
    flex: 1,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7C8792",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

<<<<<<< HEAD
listNameSection: {
  marginBottom: 18,
},
});
=======
  categoryItemText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  categoryDeleteButton: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  addCategoryButton: {
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },

  addCategoryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  closeCategoryButton: {
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7C8792",
    justifyContent: "center",
    alignItems: "center",
  },

  closeCategoryText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  categoryAddOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  categoryAddModal: {
    width: "100%",
    backgroundColor: "#102B47",
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 30,
  },

  categoryAddTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 26,
  },

  categoryAddInput: {
    height: 55,
    borderRadius: 28,
    backgroundColor: "#7C8792",
    color: "#FFFFFF",
    paddingHorizontal: 20,
    fontSize: 15,
  },

  categoryAddActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },

  categoryAddCancelButton: {
    height: 45,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryAddCancelText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  categoryAddConfirmButton: {
    height: 45,
    minWidth: 70,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  categoryAddDisabled: {
    backgroundColor: "#D9D9D9",
  },

  categoryAddDisabledText: {
    color: "#AFAFAF",
  },

  categoryAddConfirmText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
  },
});
}
>>>>>>> 4a9915e (feat: 캘린더 탭 수정중)
