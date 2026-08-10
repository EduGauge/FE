import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type EmptyListViewProps = {
  elapsedSeconds: number;
  onAddCategory?: () => void;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function EmptyListView({
  elapsedSeconds,
  onAddCategory,
}: EmptyListViewProps) {
  return (
    <View style={styles.container}>
      {/* 총 시간 */}
      <Text style={styles.totalLabel}>총 시간</Text>

      <Text style={styles.totalTime}>
        {formatTime(elapsedSeconds)}
      </Text>

      {/* 진행바 */}
      <View style={styles.progressTrack} />

      {/* 리스트 제목 + 추가 버튼 */}
      <View style={styles.listTitleRow}>
        <Text style={styles.listTitle}>리스트</Text>

        <Pressable
          disabled={!onAddCategory}
          onPress={onAddCategory}
          style={styles.addButton}
          hitSlop={8}
        >
          <Image
            source={require("../../assets/icons/plus.png")}
            style={styles.addIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* 설명 */}
      <View style={styles.descriptionRow}>
        <Image
          source={require("../../assets/icons/messenger.png")}
          style={styles.messengerIcon}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          리스트에 할 일을 추가해보아요!
        </Text>
      </View>

      {/* 캐릭터 */}
      <Image
        source={require("../../assets/characters/character2.png")}
        style={styles.character}
        resizeMode="contain"
      />

      <Text style={styles.emptyText}>
        작성된 리스트가 없습니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  totalTime: {
    color: "#E3C943",
    fontSize: 64,
    fontWeight: "700",
    letterSpacing: 1,
  },

  progressTrack: {
    width: "100%",
    height: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#454E36",
  },

  listTitleRow: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
  },

  listTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },

  addButton: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  addIcon: {
    width: 18,
    height: 18,
  },

  descriptionRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  messengerIcon: {
    width: 12,
    height: 12,
  },

  description: {
    marginLeft: 5,
    color: "#FFFFFF",
    fontSize: 8,
  },

  character: {
    width: 82,
    height: 70,
    marginTop: 36,
  },

  emptyText: {
    marginTop: 35,
    color: "#FFFFFF",
    fontSize: 13,
  },
});
