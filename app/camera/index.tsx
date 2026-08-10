import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Header from "../../components/Header";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  const handleTakePhoto = async () => {
    if (!cameraRef.current || isTakingPhoto) return;

    try {
      setIsTakingPhoto(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

      if (photo?.uri) {
        router.replace("/list");
      }
    } catch (error) {
      console.error("사진 촬영 실패:", error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Header title="인증샷" />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>카메라를 준비하고 있습니다.</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Header title="인증샷" />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            인증 사진 촬영을 위해 카메라 권한이 필요합니다.
          </Text>
          <Pressable style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>카메라 허용</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="인증샷" />

      <View style={styles.previewArea}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          mode="picture"
        />
      </View>

      <View style={styles.bottomArea}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="사진 촬영"
          disabled={isTakingPhoto}
          onPress={handleTakePhoto}
          style={({ pressed }) => [
            styles.captureButton,
            (pressed || isTakingPhoto) && styles.captureButtonPressed,
          ]}
        >
          <View style={styles.captureInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
  },
  previewArea: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  bottomArea: {
    height: 94,
    backgroundColor: "#071F30",
    alignItems: "center",
  },
  captureButton: {
    position: "absolute",
    top: -40,
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: "#FFFFFF",
    backgroundColor: "#E3C943",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  captureButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
  permissionContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    marginBottom: 24,
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },
  permissionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#E3C943",
  },
  permissionButtonText: {
    color: "#071F30",
    fontSize: 14,
    fontWeight: "700",
  },
});
