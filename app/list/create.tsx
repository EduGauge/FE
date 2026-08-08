import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams, } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform, Pressable, ScrollView, StyleSheet, Text,
  TextInput,
  View
} from "react-native";
import { useCategories } from "../../context/CategoryContext";
import { useTodos } from "../../context/TodoContext";

import CancelModal from "../../components/CancelModal";
import CategorySelectModal from "../../components/CategorySelectModal";
import RepeatModal from "../../components/RepeatModal";

export default function CreateList() {

  const { category, mode } =  useLocalSearchParams<{
    category?: string;
    mode?: string;
  }>();

  const [listName, setListName] = useState("");

  const { addTodo } = useTodos();

  const { categories,  addCategory,  deleteCategory} = useCategories();

  const [selectedCategory, setSelectedCategory] =
    useState(category ?.toString() ?? "");

  const [repeat, setRepeat] = useState("없음");

  const [repeatEnd, setRepeatEnd] =
    useState("없음");

  const [date, setDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  const [showRepeatModal, setShowRepeatModal] =
    useState(false);

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [isListNameFocused, setIsListNameFocused] =
    useState(false);

  const [isCategoryFocused, setIsCategoryFocused] =
    useState(false);

  useEffect(() => {
    if (category) {
      setSelectedCategory(
        category.toString()
      );
    }
  }, [category]);

  const isValid =
    listName.trim() !== "" &&
    selectedCategory !== "";

  const handleCreate = () => {
    
   if (mode === "newCategory" &&
  !categories.includes(selectedCategory)
   ) {
    addCategory(selectedCategory);
   }

  addTodo({
    id: Date.now().toString(),
    title: listName,
    category: selectedCategory,
    repeat,
    repeatEnd,
    checked: false,
  });
    router.replace("/list");
    setListName("");
    setSelectedCategory("");
    setRepeat("없음");
    setRepeatEnd("없음");
};


  const handleDeleteCategory = (category: string) => {
    deleteCategory(category);

    if (selectedCategory === category) {
      setSelectedCategory("");
    }
};

  return (
    <View style={styles.container}>

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
          {mode === "newCategory"
          ? "새 카테고리 만들기"
          : "리스트 생성"}
        </Text>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
      
      <View style={styles.listNameSection}>

        <View style={styles.inputContainer}>

          <Text style={styles.inputLabel}>
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
      onFocus={() => setIsListNameFocused(true)}
      onBlur={() => setIsListNameFocused(false)}
      onChangeText={setListName}
    />

  </View>

        <Text style={styles.countText}>
          {listName.length}/20
        </Text>
      </View>


        
    {mode === "newCategory" ? (

      <View style={styles.inputContainer}>

        <Text style={styles.inputLabel}>
          카테고리
        </Text>

    <TextInput
      style={[
        styles.input,
        !isCategoryFocused &&
          selectedCategory !== "" &&
          styles.inputRight,
        ]}
      value={selectedCategory}
      onChangeText={setSelectedCategory}
      placeholder=""
      placeholderTextColor="#CFCFCF"
      onFocus={()=>setIsCategoryFocused(true)}
      onBlur={()=>setIsCategoryFocused(false)}
      maxLength={15}
    />

  </View>

) : (

  <Pressable
    style={styles.inputContainer}
    onPress={() =>
      setShowCategoryModal(true)
    }
  >

    <Text style={styles.inputLabel}>
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

)}
    

        <Pressable
          style={[styles.inputContainer, styles.sectionSpacing]}
          onPress={() =>
            setShowRepeatModal(true)
          }
        >
          <Text style={styles.inputLabel}>
            반복
          </Text>

          <Text style={styles.selectText}>
            {repeat}
          </Text>

          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#FFFFFF"
          />

        </Pressable>


        <Pressable
          style={[styles.inputContainer, styles.sectionSpacing]}
          onPress={() => {
            if (repeat === "없음") return;
            setShowDatePicker(true)
          }}
        >
          <Text style={styles.inputLabel}>
            반복종료
         </Text>

          <Text style={[
            styles.selectText,
            repeatEnd !== "없음" &&
            styles.placeholder,
           ]}>
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
            onChange={(event, selectedDate) => {
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
          !isValid && styles.disabledButton,
        ]}
        disabled={!isValid}
        onPress={handleCreate}
      >
        <Text
          style={[
            styles.createButtonText,
            !isValid && styles.disabledButtonText,
          ]}
        >
          등록하기
        </Text>
      </Pressable>

    
      <CategorySelectModal
        visible={showCategoryModal}
        categories={categories}
        selectedCategory={selectedCategory}
        onClose={() => setShowCategoryModal(false)}
        onSelect={(category) => {
          setSelectedCategory(category);
          setShowCategoryModal(false);
        }}
        onDelete={handleDeleteCategory}
        onAdd={() => {
          setShowCategoryModal(false);
          router.push("/list/manage");
        }}
      />

    
      <RepeatModal
        visible={showRepeatModal}
        selected={repeat}
        onClose={() => setShowRepeatModal(false)}
        onSelect={(value) => {
          setRepeat(value);

          if (value === "없음") {
            setRepeatEnd("없음");
          }
        }}
      />

      <CancelModal
        visible={showCancelModal}
        onContinue={() => setShowCancelModal(false)}
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

  input: {
    flex: 1,
    marginLeft: 20, 
    color: "#FFFFFF",
  },

  countText: {
    color: "#CFCFCF",
    fontSize: 11,
    textAlign: "right",
    marginTop: 6,
  },

  selectBox: {
    height: 55,
    backgroundColor: "#7C8792",
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectText: {
    color: "#FFFFFF",
    marginLeft: "auto",
    marginRight: 6,
  },

  placeholder: {
    color: "#CFCFCF",
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


  divider: {
    height: 1,
    backgroundColor: "#415366",
    marginVertical: 20,
  },

  section: {
    marginBottom: 22,
  },

  required: {
    color: "#FF8C8C",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionButton: {
    height: 55,
    backgroundColor: "#7C8792",
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionText: {
    color: "#FFFFFF",
  },

  placeholderText: {
    color: "#CFCFCF",
  },

  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    marginTop: 10,
  },

  inputRight: {
    textAlign: "right",
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

sectionSpacing: {
  marginTop: 18,
},

listNameSection: {
  marginBottom: 18,
},
});
