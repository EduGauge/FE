import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useCategories } from "../../../context/CategoryContext";
import { useTodos } from "../../../context/TodoContext";

const repeatOptions = ["안함", "매일", "매주", "매월"];

export default function AddListScreen() {
  const { categories } = useCategories();
  const { addTodo } = useTodos();

  const [listName, setListName] = useState("");
  const [isListNameConfirmed, setIsListNameConfirmed] =
    useState(false);

  const [category, setCategory] = useState("");
  const [repeat, setRepeat] = useState("");
  const [repeatEnd, setRepeatEnd] = useState("");
  const [endDate, setEndDate] = useState(new Date());

  const [openMenu, setOpenMenu] = useState<
    "category" | "repeat" | "repeatEnd" | null
  >(null);

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const isComplete =
    isListNameConfirmed &&
    listName.trim() !== "" &&
    category !== "" &&
    repeat !== "" &&
    repeatEnd !== "";

  const formatDate = (date: Date) =>
    `${date.getFullYear()}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}.`;

  const handleListNameSubmit = () => {
    if (!listName.trim()) {
      return;
    }

    setIsListNameConfirmed(true);
  };

  const handleListNameChange = (text: string) => {
    setListName(text);
    setIsListNameConfirmed(false);
    setCategory("");
    setRepeat("");
    setRepeatEnd("");
    setOpenMenu(null);
    setShowDatePicker(false);
  };

  const handleRegister = () => {
    if (!isComplete) return;

    addTodo({
      id: Date.now().toString(),
      title: listName.trim(),
      category,
      repeat,
      repeatEnd,
      checked: false,
    });

    router.dismissAll();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* 리스트명 */}
        <View style={styles.field}>
          <Text style={styles.label}>
            리스트명
          </Text>

          <TextInput
            value={listName}
            onChangeText={handleListNameChange}
            onSubmitEditing={handleListNameSubmit}
            placeholder="할 일을 입력하세요"
            placeholderTextColor="#D7DDE1"
            maxLength={30}
            style={styles.input}
            returnKeyType="done"
          />
        </View>

        {/* 카테고리 */}
        {isListNameConfirmed ? (
          <>
            <SelectField
              label="카테고리"
              value={category || "선택"}
              onPress={() =>
                setOpenMenu(
                  openMenu === "category"
                    ? null
                    : "category"
                )
              }
            />

            {openMenu === "category" ? (
              <OptionMenu
                options={categories}
                onSelect={(value) => {
                  setCategory(value);
                  setRepeat("");
                  setRepeatEnd("");
                  setShowDatePicker(false);
                  setOpenMenu(null);
                }}
              />
            ) : null}
          </>
        ) : null}

        {/* 반복 */}
        {category ? (
          <>
            <SelectField
              label="반복"
              value={repeat || "선택"}
              onPress={() =>
                setOpenMenu(
                  openMenu === "repeat"
                    ? null
                    : "repeat"
                )
              }
            />

            {openMenu === "repeat" ? (
              <OptionMenu
                options={repeatOptions}
                onSelect={(value) => {
                  setRepeat(value);
                  setRepeatEnd("");
                  setShowDatePicker(false);
                  setOpenMenu(null);
                }}
              />
            ) : null}
          </>
        ) : null}

        {/* 반복 종료 */}
        {repeat ? (
          <>
            <SelectField
              label="반복종료"
              value={repeatEnd || "선택"}
              onPress={() =>
                setOpenMenu(
                  openMenu === "repeatEnd"
                    ? null
                    : "repeatEnd"
                )
              }
            />

            {openMenu === "repeatEnd" ? (
              <OptionMenu
                options={[
                  "안함",
                  "날짜 선택",
                ]}
                onSelect={(value) => {
                  if (value === "안함") {
                    setRepeatEnd("안함");
                    setShowDatePicker(false);
                    setOpenMenu(null);
                    return;
                  }

                  setShowDatePicker(true);
                  setOpenMenu(null);
                }}
              />
            ) : null}
          </>
        ) : null}

        {/* 날짜 선택 */}
        {showDatePicker ? (
          <View
            style={
              styles.datePickerContainer
            }
          >
            <DateTimePicker
              value={endDate}
              mode="date"
              minimumDate={new Date()}
              display={
                Platform.OS === "ios"
                  ? "inline"
                  : "default"
              }
              onChange={(_, date) => {
                if (
                  Platform.OS === "android"
                ) {
                  setShowDatePicker(false);
                }

                if (date) {
                  setEndDate(date);
                  setRepeatEnd(
                    formatDate(date)
                  );
                }
              }}
            />

            {Platform.OS === "ios" ? (
              <Pressable
                onPress={() =>
                  setShowDatePicker(false)
                }
                style={
                  styles.dateConfirmButton
                }
              >
                <Text
                  style={
                    styles.dateConfirmText
                  }
                >
                  선택 완료
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {/* 등록 / 취소 */}
        {isComplete ? (
          <View style={styles.actions}>
            <Pressable
              onPress={handleRegister}
              hitSlop={10}
            >
              <Text
                style={
                  styles.registerText
                }
              >
                등록하기
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                router.back()
              }
              hitSlop={10}
            >
              <Text
                style={styles.cancelText}
              >
                취소
              </Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onPress: () => void;
};

function SelectField({
  label,
  value,
  onPress,
}: SelectFieldProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.field}
    >
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </Pressable>
  );
}

type OptionMenuProps = {
  options: string[];
  onSelect: (value: string) => void;
};

function OptionMenu({
  options,
  onSelect,
}: OptionMenuProps) {
  return (
    <View style={styles.optionMenu}>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() =>
            onSelect(option)
          }
          style={styles.option}
        >
          <Text
            style={styles.optionText}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 42,
  },

  field: {
    minHeight: 40,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    boxShadow:
      "inset 0 0 10px 5px rgba(255, 255, 255, 0.25)",
  },

  label: {
    color: "#D9D9D9",
    fontSize: 8,
  },

  input: {
    flex: 1,
    marginLeft: 14,
    paddingVertical: 0,
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "right",
  },

  value: {
    flex: 1,
    marginLeft: 14,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },

  optionMenu: {
    alignSelf: "flex-end",
    minWidth: 120,
    marginTop: -4,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#455764",
    gap: 10,
  },

  option: {
    minHeight: 25,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  optionText: {
    color: "#071F30",
    fontSize: 13,
    fontWeight: "500",
  },

  datePickerContainer: {
    marginTop: -4,
    borderRadius: 10,
    backgroundColor: "#5B6875",
    overflow: "hidden",
    padding: 8,
  },

  dateConfirmButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  //여기서부터 아직 구현 안됨
  dateConfirmText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  actions: {
    marginTop: "auto",
    paddingTop: 90,
    alignItems: "center",
    gap: 28,
  },

  registerText: {
    color: "#E3C943",
    fontSize: 13,
    fontWeight: "600",
  },

  cancelText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});