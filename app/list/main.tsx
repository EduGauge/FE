import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ListMain() {
  const [checked, setChecked] = useState(false);

  const totalTime = "00:00";

  const progress = 0;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.logo}>
          LOGO
        </Text>

        <View style={styles.headerRight}>

          <Pressable
            onPress={() => router.push("/profile")}
          >
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            style={{ marginLeft: 12 }}
            onPress={() =>
              router.push("/notification")
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

      <View style={styles.divider} />

      <Text style={styles.totalLabel}>
        총 시간
      </Text>

      <Text style={styles.totalTime}>
        {totalTime}
      </Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() =>
          router.push("/list/create")
        }
      >

        <Ionicons
          name="add"
          size={28}
          color="#FFFFFF"
        />

      </Pressable>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>

            <View style={styles.cardHeader}>

            <Text style={styles.category}>
              학업
            </Text>

            <Text style={styles.repeat}>
              매일
            </Text>

          </View>

          <Text style={styles.listTitle}>
            경제학 과제
          </Text>

          <View style={styles.cardBottom}>

            <View style={styles.timeContainer}>

              <Ionicons
                name="time-outline"
                size={18}
                color="#F6D64A"
              />

              <Text style={styles.time}>
                00:00
              </Text>

            </View>

            <Pressable
              onPress={() =>
                setChecked(!checked)
              }
            >
              <Ionicons
                name={
                  checked
                    ? "checkbox"
                    : "square-outline"
                }
                size={28}
                color="#9F82FF"
              />
            </Pressable>

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#10243A",
  },

  header: {
    marginTop: 55,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#F6D64A",
    fontSize: 22,
    fontWeight: "700",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    marginTop: 15,
    height: 1,
    backgroundColor: "#415366",
  },

  totalLabel: {
    marginTop: 35,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 15,
  },

  totalTime: {
    marginTop: 10,
    textAlign: "center",
    color: "#F6D64A",
    fontSize: 56,
    fontWeight: "700",
  },

  progressBackground: {
    marginTop: 22,
    marginHorizontal: 24,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#55613A",
  },

  progressBar: {
    height: "100%",
    borderRadius: 9,
    backgroundColor: "#F6D64A",
  },

  addButton: {
    alignSelf: "center",
    marginTop: 28,
  },

  listContainer: {
    marginTop: 25,
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#22354B",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

    cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  category: {
    color: "#9F82FF",
    fontSize: 13,
    fontWeight: "700",
  },

  repeat: {
    color: "#CFCFCF",
    fontSize: 12,
  },

  listTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    marginLeft: 6,
    color: "#F6D64A",
    fontSize: 16,
    fontWeight: "700",
  },

});