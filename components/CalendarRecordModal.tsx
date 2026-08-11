import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import RecordDetails from "./calendar-record/RecordDetails";
import RecordHero from "./calendar-record/RecordHero";
import { getCharacter, getRecordMessage } from "./calendar-record/record-utils";
import type { CalendarRecordModalProps } from "./calendar-record/types";

export type { CalendarRecord, CalendarTodo } from "./calendar-record/types";

export default function CalendarRecordModal({
  visible,
  record,
  onClose,
}: CalendarRecordModalProps) {
  if (!record) {
    return null;
  }

  const progress = Math.min(Math.max(record.progress, 0), 100);
  const isCompleted = progress >= 100;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />

        <View style={styles.modalCard}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            alwaysBounceVertical={true}
            keyboardShouldPersistTaps="handled"
            overScrollMode="always"
          >
            <Text style={styles.dateText}>{record.date}</Text>
            <RecordHero
              progress={progress}
              elapsedSeconds={record.elapsedSeconds}
              photoUri={record.photoUri}
              isCompleted={isCompleted}
              character={getCharacter(progress)}
              message={getRecordMessage(progress)}
            />
            <RecordDetails
              progress={progress}
              elapsedSeconds={record.elapsedSeconds}
              todos={record.todos}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  modalCard: {
    width: "100%",
    height: "88%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
  },
  scrollContent: { paddingBottom: 40, flexGrow: 1 },
  dateText: {
    color: "#10243A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 18,
    paddingBottom: 16,
  },
  scrollView: { flex: 1, width: "100%" },
});
