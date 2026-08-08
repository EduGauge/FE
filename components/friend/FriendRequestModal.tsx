import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FriendRequestModalProps = {
  visible: boolean;
  nickname: string;
  gaugeText?: string;
  onAccept: () => void;
  onReject: () => void;
};

export default function FriendRequestModal({
  visible,
  nickname,
  gaugeText = "pickasssso",
  onAccept,
  onReject,
}: FriendRequestModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            친구 추가 요청 알림
          </Text>

          <Text style={styles.message}>
            ‘{nickname}’님이 친구 추가 요청을 보냈습니다.
          </Text>

          {/* 게이지 */}
          <View style={styles.gaugeWrapper}>
            <View style={styles.gaugeBackground}>
              <View style={styles.gaugeFill}>
                <Text style={styles.gaugeText}>
                  {gaugeText}
                </Text>
              </View>
            </View>

            <View style={styles.characterWrapper}>
              <Image
                source={require("../../../assets/characters/character1.png")}
                style={styles.character}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* 버튼 */}
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.button}
              onPress={onAccept}
            >
              <Text style={styles.buttonText}>
                수락
              </Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={onReject}
            >
              <Text style={styles.buttonText}>
                거절
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 24,
  },

  modal: {
    width: "100%",
    maxWidth: 490,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingHorizontal: 42,
    paddingTop: 28,
    paddingBottom: 28,
  },

  title: {
    textAlign: "center",
    color: "#082333",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  message: {
    textAlign: "center",
    color: "#082333",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 24,
  },

  gaugeWrapper: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 26,
  },

  gaugeBackground: {
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5EDC5",
    overflow: "hidden",
  },

  gaugeFill: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#E8CC36",
    paddingLeft: 14,
  },

  gaugeText: {
    color: "#082333",
    fontSize: 16,
    fontWeight: "600",
  },

  characterWrapper: {
    position: "absolute",
    left: "50%",
    marginLeft: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8CC36",
    justifyContent: "center",
    alignItems: "center",
  },

  character: {
    width: 36,
    height: 36,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {
    minWidth: 90,
    alignItems: "center",
    paddingVertical: 8,
  },

  buttonText: {
    color: "#082333",
    fontSize: 17,
    fontWeight: "700",
  },
});