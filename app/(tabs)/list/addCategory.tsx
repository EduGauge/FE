import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useCategories } from "../../../context/CategoryContext";

const repeatOptions = ["안함", "매일", "매주", "매월"];

export default function AddCategoryScreen() {
  const { mode, categoryId } = useLocalSearchParams<{
    mode?: "edit";
    categoryId?: string;
  }>();
  const { categories, addCategory, updateCategory } = useCategories();
  const editingCategory = useMemo(
    () => categories.find((item) => item.id === categoryId),
    [categories, categoryId]
  );
  const isEditMode = mode === "edit" && Boolean(editingCategory);

  const [name, setName] = useState(editingCategory?.name ?? "");
  const [repeat, setRepeat] = useState(editingCategory?.repeat ?? "안함");
  const [repeatEnd, setRepeatEnd] = useState(
    editingCategory?.repeatEnd ?? "안함"
  );
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [showRepeatEndOptions, setShowRepeatEndOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const isComplete =
    name.trim().length > 0 &&
    repeat.trim().length > 0 &&
    repeatEnd.trim().length > 0;
  const formatDate = (date: Date) =>
    `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}.`;

  const handleSubmit = () => {
    if (!isComplete) return;

    const category = {
      id: editingCategory?.id ?? `category-${Date.now()}`,
      name: name.trim(),
      repeat,
      repeatEnd,
    };

    if (isEditMode) updateCategory(category);
    else addCategory(category);

    router.replace("/list/manage");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>카테고리명</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="입력"
            placeholderTextColor="#D7DDE1"
            maxLength={30}
            style={styles.input}
          />
        </View>

        <Pressable
          style={styles.field}
          onPress={() => setShowRepeatOptions((current) => !current)}
        >
          <Text style={styles.label}>반복</Text>
          <Text style={styles.value}>{repeat || "선택"}</Text>
        </Pressable>

        {showRepeatOptions ? (
          <View style={styles.optionMenu}>
            {repeatOptions.map((option) => (
              <Pressable
                key={option}
                style={styles.option}
                onPress={() => {
                  setRepeat(option);
                  setShowRepeatOptions(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <Pressable
          style={styles.field}
          onPress={() => {
            setShowRepeatEndOptions((current) => !current);
            setShowDatePicker(false);
          }}
        >
          <Text style={styles.label}>반복종료</Text>
          <Text style={styles.value}>{repeatEnd}</Text>
        </Pressable>

        {showRepeatEndOptions ? (
          <View style={[styles.optionMenu, styles.repeatEndMenu]}>
            {["안함", "날짜 선택"].map((option) => (
              <Pressable
                key={option}
                style={styles.option}
                onPress={() => {
                  setShowRepeatEndOptions(false);

                  if (option === "안함") {
                    setRepeatEnd("안함");
                    setShowDatePicker(false);
                    return;
                  }

                  setShowDatePicker(true);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {showDatePicker ? (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={endDate}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(_, date) => {
                if (Platform.OS === "android") setShowDatePicker(false);
                if (date) {
                  setEndDate(date);
                  setRepeatEnd(formatDate(date));
                }
              }}
            />
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable disabled={!isComplete} onPress={handleSubmit}>
            <Text style={[styles.submitText, !isComplete && styles.disabled]}>
              {isEditMode ? "수정하기" : "등록하기"}
            </Text>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071F30" },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 72, paddingBottom: 42 },
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
  },
  label: { color: "#D9D9D9", fontSize: 10 },
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
    textAlign: "right",
  },
  optionMenu: {
    alignSelf: "flex-end",
    minWidth: 120,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#455764",
    gap: 10,
  },
  repeatEndMenu: {
    width: 132,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 12,
  },
  option: {
    minHeight: 25,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: { color: "#071F30", fontSize: 13, fontWeight: "500" },
  datePickerContainer: {
    borderRadius: 10,
    backgroundColor: "#5B6875",
    overflow: "hidden",
    padding: 8,
  },
  actions: { marginTop: "auto", alignItems: "center", gap: 28 },
  submitText: { color: "#E3C943", fontSize: 13, fontWeight: "600" },
  cancelText: { color: "#FFFFFF", fontSize: 13, fontWeight: "600" },
  disabled: { opacity: 0.4 },
});
