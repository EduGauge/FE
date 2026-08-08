import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ProfileScreenProps = {
  onClose?: () => void;
};

export default function ProfileScreen({
  onClose,
}: ProfileScreenProps) {
  const handleClose = onClose ?? (() => router.back());
  const [wakeUpNotification, setWakeUpNotification] =
    useState(true);

  const [friendNotification, setFriendNotification] =
    useState(true);

  const [themeMode, setThemeMode] = useState<
    "light" | "dark"
  >("light");

  const [autoMode, setAutoMode] = useState(true);

  return (
    <View style={styles.overlay}>
      {/* 모달 바깥 영역 */}
      <Pressable
        style={styles.backdrop}
        onPress={handleClose}
      />

      {/* 아래에서 올라오는 프로필 */}
      <View style={styles.sheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 완료 */}
          <View style={styles.header}>
            <View />

            <Pressable
              onPress={handleClose}
              hitSlop={10}
            >
              <Text style={styles.doneText}>
                완료
              </Text>
            </Pressable>
          </View>

          {/* 프로필 */}
          <View style={styles.profileSection}>
            <View
              style={styles.profileImageWrapper}
            >
              <Image
                source={require("../../assets/characters/character1.png")}
                style={styles.profileImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.nickname}>
              홍의와우#22
            </Text>
          </View>

          {/* 계정 정보 */}
          <View style={styles.accountSection}>
            <InfoRow
              label="아이디"
              value="hongik_WOW"
            />

            <InfoRow
              label="비밀번호"
              value="ntWOW_WOWWW"
            />
          </View>

          {/* 알림 모드 */}
          <SectionTitle title="알림 모드" />

          <View style={styles.settingGroup}>
            <SettingToggleRow
              label="친구 깨우기 알림"
              value={wakeUpNotification}
              onPress={() =>
                setWakeUpNotification(
                  (prev) => !prev,
                )
              }
            />

            <SettingToggleRow
              label="친구 추가 알림"
              value={friendNotification}
              onPress={() =>
                setFriendNotification(
                  (prev) => !prev,
                )
              }
            />
          </View>

          {/* 화면 모드 */}
          <SectionTitle title="화면 모드" />

          <View style={styles.themeRow}>
            <Pressable
              style={styles.themeOption}
              onPress={() =>
                setThemeMode("light")
              }
            >
              <View
                style={[
                  styles.radioOuter,
                  themeMode === "light" &&
                    styles.radioOuterSelected,
                ]}
              >
                {themeMode === "light" && (
                  <View
                    style={styles.radioInner}
                  />
                )}
              </View>

              <Text style={styles.themeText}>
                라이트 모드
              </Text>
            </Pressable>

            <Pressable
              style={styles.themeOption}
              onPress={() =>
                setThemeMode("dark")
              }
            >
              <View
                style={[
                  styles.radioOuter,
                  themeMode === "dark" &&
                    styles.radioOuterSelected,
                ]}
              >
                {themeMode === "dark" && (
                  <View
                    style={styles.radioInner}
                  />
                )}
              </View>

              <Text style={styles.themeText}>
                다크 모드
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {/* 자동 */}
          <View style={styles.autoRow}>
            <Text style={styles.settingText}>
              자동
            </Text>

            <Toggle
              value={autoMode}
              onPress={() =>
                setAutoMode((prev) => !prev)
              }
            />
          </View>

          {/* 탈퇴 */}
          <Pressable
            style={styles.withdrawButton}
            onPress={() => {
              console.log("회원 탈퇴");
            }}
          >
            <Text style={styles.withdrawText}>
              탈퇴하기
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

type SettingToggleRowProps = {
  label: string;
  value: boolean;
  onPress: () => void;
};

function SettingToggleRow({
  label,
  value,
  onPress,
}: SettingToggleRowProps) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingText}>
        {label}
      </Text>

      <Toggle
        value={value}
        onPress={onPress}
      />
    </View>
  );
}

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <Text style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

type ToggleProps = {
  value: boolean;
  onPress: () => void;
};

function Toggle({
  value,
  onPress,
}: ToggleProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.toggle,
        value
          ? styles.toggleActive
          : styles.toggleInactive,
      ]}
    >
      <View
        style={[
          styles.toggleCircle,
          value
            ? styles.toggleCircleActive
            : styles.toggleCircleInactive,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },

  sheet: {
    height: "88%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  doneText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "600",
  },

  profileSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 38,
  },

  profileImageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F2D63D",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  profileImage: {
    width: 58,
    height: 58,
  },

  nickname: {
    marginTop: 14,
    color: "#333333",
    fontSize: 18,
    fontWeight: "700",
  },

  accountSection: {
    gap: 26,
    marginBottom: 46,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoLabel: {
    width: 95,
    color: "#333333",
    fontSize: 11,
    fontWeight: "500",
  },

  infoValue: {
    color: "#333333",
    fontSize: 12,
    fontWeight: "600",
  },

  sectionTitle: {
    marginBottom: 16,
    color: "#444444",
    fontSize: 11,
    fontWeight: "600",
  },

  settingGroup: {
    gap: 18,
    marginBottom: 42,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingText: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "500",
  },

  toggle: {
    width: 38,
    height: 21,
    borderRadius: 999,
    padding: 2,
    justifyContent: "center",
  },

  toggleActive: {
    backgroundColor: "#06283D",
  },

  toggleInactive: {
    backgroundColor: "#D9D9D9",
  },

  toggleCircle: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: "#FFFFFF",
  },

  toggleCircleActive: {
    alignSelf: "flex-end",
  },

  toggleCircleInactive: {
    alignSelf: "flex-start",
  },

  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 38,
    marginLeft: 26,
  },

  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterSelected: {
    borderColor: "#06283D",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#06283D",
  },

  themeText: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#E7E7E7",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 25,
  },

  autoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  withdrawButton: {
    marginTop: "auto",
    paddingTop: 80,
    alignItems: "center",
  },

  withdrawText: {
    color: "#FF3B30",
    fontSize: 12,
    fontWeight: "600",
  },
});
