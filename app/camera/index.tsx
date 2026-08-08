import { Ionicons } from "@expo/vector-icons";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import {
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// =========================
// 화면 크기
// =========================

const { width, height } =
  Dimensions.get("window");

// =========================
// 카메라 영역 크기 계산
// =========================

const HEADER_HEIGHT = 62;
const BOTTOM_HEIGHT = 72;

const availableHeight =
  height -
  HEADER_HEIGHT -
  BOTTOM_HEIGHT;

const CAMERA_SIZE = Math.min(
  width,
  availableHeight
);

export default function CameraScreen() {
  const cameraRef =
    useRef<CameraView | null>(null);

  const [
    permission,
    requestPermission,
  ] = useCameraPermissions();

  const [
    isTakingPhoto,
    setIsTakingPhoto,
  ] = useState(false);

  // -------------------------
  // 카메라 권한 로딩
  // -------------------------

  if (!permission) {
    return (
      <View
        style={
          styles.permissionContainer
        }
      >
        <Text
          style={
            styles.permissionText
          }
        >
          카메라를 준비하고 있습니다.
        </Text>
      </View>
    );
  }

  // -------------------------
  // 카메라 권한 없음
  // -------------------------

  if (!permission.granted) {
    return (
      <View
        style={
          styles.permissionContainer
        }
      >
        <Text
          style={
            styles.permissionText
          }
        >
          인증 사진 촬영을 위해
          {"\n"}
          카메라 권한이 필요합니다.
        </Text>

        <Pressable
          style={
            styles.permissionButton
          }
          onPress={requestPermission}
        >
          <Text
            style={
              styles.permissionButtonText
            }
          >
            카메라 허용
          </Text>
        </Pressable>
      </View>
    );
  }

  // -------------------------
  // 사진 촬영
  // -------------------------

  const handleTakePhoto = async () => {
    if (
      !cameraRef.current ||
      isTakingPhoto
    ) {
      return;
    }

    try {
      setIsTakingPhoto(true);

      const photo =
        await cameraRef.current.takePictureAsync(
          {
            quality: 0.8,
          }
        );

      if (photo?.uri) {
        console.log(
          "촬영된 사진:",
          photo.uri
        );

        // TODO:
        // 나중에 여기서 사진 URI를
        // TodoContext 또는 저장소에 저장
        //
        // 현재는 촬영 후 리스트 화면으로 이동

        router.replace("/list");
      }
    } catch (error) {
      console.error(
        "사진 촬영 실패:",
        error
      );
    } finally {
      setIsTakingPhoto(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* =========================
          카메라 영역
      ========================= */}

      <View
        style={styles.cameraArea}
      >
        <View
          style={styles.cameraWrapper}
        >
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            mode="picture"
          />
        </View>
      </View>

      {/* =========================
          헤더
      ========================= */}

      <View
        style={styles.header}
      >

        

        <Pressable
          style={styles.backButton}
          onPress={() =>
            router.back()
          }
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        

        <Text
          style={styles.headerTitle}
        >
          인증샷
        </Text>

        

        <View
          style={styles.headerRight}
        >

          <Pressable
            hitSlop={10}
            onPress={() =>
              router.push(
                "/mypage"
              )
            }
          >
            <Ionicons
              name="person-circle"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            style={styles.menuButton}
            hitSlop={10}
            onPress={() =>
              router.push(
                "/notification"
              )
            }
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="#FFFFFF"
            />
          </Pressable>

        </View>

      </View>

      {/* =========================
          촬영 버튼 영역
      ========================= */}

      <View
        style={styles.bottomArea}
      >

        <Pressable
          style={[
            styles.captureButton,
            isTakingPhoto &&
              styles.captureButtonDisabled,
          ]}
          onPress={handleTakePhoto}
          disabled={isTakingPhoto}
        >

          <View
            style={styles.captureInner}
          />

        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  // =========================
  // 전체
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#071F30",
  },

  // =========================
  // 카메라
  // =========================

  cameraArea: {
  position: "absolute",
  top: HEADER_HEIGHT,
  bottom: BOTTOM_HEIGHT,
  left: 0,
  right: 0,

  justifyContent: "center",
  alignItems: "center",
},

cameraWrapper: {
  width: CAMERA_SIZE,
  height: CAMERA_SIZE,
  overflow: "hidden",
},

camera: {
  width: "100%",
  height: "100%",
},

  // =========================
  // 헤더
  // =========================

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    height: 62,

    backgroundColor:
      "#071F30",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  },

  backButton: {
    position: "absolute",
    left: 18,

    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  headerRight: {
    position: "absolute",
    right: 16,

    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginLeft: 12,
  },

  // =========================
  // 하단
  // =========================

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: BOTTOM_HEIGHT,

    backgroundColor:
      "#071F30",

    justifyContent: "center",
    alignItems: "center",
  },

  // =========================
  // 촬영 버튼
  // =========================

  captureButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor:
      "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 4,
    borderColor:
      "#F6D64A",
  },

  captureInner: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor:
      "#F6D64A",
  },

  captureButtonDisabled: {
    opacity: 0.5,
  },

  // =========================
  // 권한 화면
  // =========================

  permissionContainer: {
    flex: 1,

    backgroundColor:
      "#071F30",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  permissionText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },

  permissionButton: {
    backgroundColor:
      "#F6D64A",

    paddingHorizontal: 24,
    paddingVertical: 12,

    borderRadius: 20,
  },

  permissionButtonText: {
    color: "#071F30",
    fontSize: 14,
    fontWeight: "700",
  },
});