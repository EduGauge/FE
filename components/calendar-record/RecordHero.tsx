import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  formatTime,
  type RecordMessage,
} from "./record-utils";

const logoBack = require("../../assets/logos/logo.png");

type RecordHeroProps = {
  progress: number;
  elapsedSeconds: number;
  photoUri?: ImageSourcePropType;
  isCompleted: boolean;
  character: ImageSourcePropType;
  message: RecordMessage;
};

export default function RecordHero({
  progress,
  elapsedSeconds,
  photoUri,
  isCompleted,
  character,
  message,
}: RecordHeroProps) {
  if (isCompleted) {
    return (
      <View style={styles.completedSection}>
        <View style={styles.photoArea}>
          {photoUri ? (
            <Image
              source={photoUri}
              style={styles.photoImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons
                name="image-outline"
                size={48}
                color="#FFFFFF"
              />

              <Text style={styles.photoPlaceholderText}>
                인증샷
              </Text>
            </View>
          )}

          <Text style={styles.photoTime}>
            {formatTime(elapsedSeconds)}
          </Text>

          <Image
            source={logoBack}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <View style={styles.photoGauge}>
            <View
              style={[
                styles.photoGaugeFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <Image
            source={character}
            style={styles.photoCharacter}
            resizeMode="contain"
          />
        </View>

        <View style={styles.completedMessage}>
          <Text style={styles.completedMessageText}>
            {message.first}
          </Text>

          <Text style={styles.completedMessageText}>
            {message.second}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.normalSection}>
      <View style={styles.messageArea}>
        <Text style={styles.messageText}>
          {message.first}
        </Text>

        <Text style={styles.messageText}>
          {message.second}
        </Text>
      </View>

      <View style={styles.characterArea}>
        <Image
          source={character}
          style={styles.largeCharacter}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  completedSection: {
    width: "100%",
  },

  photoArea: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
    backgroundColor: "#B7B7B7",
    overflow: "hidden",
  },

  photoImage: {
    width: "100%",
    height: "100%",
  },

  photoPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#82909B",
  },

  photoPlaceholderText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 8,
  },

  photoTime: {
    position: "absolute",
    top: 16,
    left: 16,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  logoImage: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 82,
    height: 28,
  },

  photoGauge: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    height: 26,
    borderRadius: 14,
    backgroundColor: "#F2EED3",
    overflow: "hidden",
    marginHorizontal: 12,
  },

  photoGaugeFill: {
    height: "100%",
    backgroundColor: "#E9CB39",
    borderRadius: 14,
  },

  photoCharacter: {
    position: "absolute",
    left: 28,
    bottom: 58,
    width: 62,
    height: 62,
    zIndex: 5,
  },

  completedMessage: {
    minHeight: 145,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  completedMessageText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },

  normalSection: {
    width: "100%",
  },

  messageArea: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  messageText: {
    color: "#10243A",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
  },

  characterArea: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },

  largeCharacter: {
    width: 155,
    height: 155,
  },
});