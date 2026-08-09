import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CalendarRecordModal, {
  CalendarRecord,
} from "../../../components/CalendarRecordModal";


// 100%
const character100 = require(
  "../../../assets/characters/calender_1.png"
);

// 70%
const character70 = require(
  "../../../assets/characters/calender_2.png"
);

// 30%
const character30 = require(
  "../../../assets/characters/calender_3.png"
);

// 0%
const character0 = require(
  "../../../assets/characters/calender_4.png"
);

// =========================
// 현재 표시할 년 / 월
// =========================

const YEAR = 2026;
const MONTH = 7;

// =========================
// 테스트 기록
// =========================

const RECORDS: Record<
  string,
  CalendarRecord
> = {
  "2026-07-01": {
    date: "2026.07.01",
    progress: 100,
    elapsedSeconds: 3,
    completed: true,
    photo: true,

    todos: [
      {
        id: "1",
        title:
          "기상 후_땅끄부부 홈트 영상 1시간 따라하기",
        checked: true,
        category: "운동",
      },
      {
        id: "2",
        title:
          "점심 식사 후_15분 이상 걷기",
        checked: true,
        category: "운동",
      },
      {
        id: "3",
        title:
          "저녁 식사 후_3KM 15분 내 러닝하기",
        checked: true,
        category: "운동",
      },
    ],
  },

  "2026-07-02": {
    date: "2026.07.02",
    progress: 100,
    elapsedSeconds: 90,
    completed: true,
    photo: true,

    todos: [
      {
        id: "4",
        title:
          "기상 후_땅끄부부 홈트 영상 따라하기",
        checked: true,
        category: "운동",
      },
      {
        id: "5",
        title:
          "점심 식사 후_15분 이상 걷기",
        checked: true,
        category: "운동",
      },
    ],
  },

  "2026-07-03": {
    date: "2026.07.03",
    progress: 50,
    elapsedSeconds: 90,
    completed: false,
    photo: false,

    todos: [
      {
        id: "6",
        title:
          "기상 후_땅끄부부 홈트 영상 1시간 따라하기",
        checked: true,
        category: "운동",
      },
      {
        id: "7",
        title:
          "점심 식사 후_15분 이상 걷기",
        checked: false,
        category: "운동",
      },
      {
        id: "8",
        title:
          "저녁 식사 후_3KM 15분 내 러닝하기",
        checked: false,
        category: "운동",
      },
    ],
  },
};



const getCharacter = (
  progress: number
): ImageSourcePropType => {
  if (progress >= 100) {
    return character100;
  }

  if (progress >= 70) {
    return character70;
  }

  if (progress >= 30) {
    return character30;
  }

  return character0;
};


export default function CalendarScreen() {
  const [
    selectedRecord,
    setSelectedRecord,
  ] = useState<CalendarRecord | null>(
    null
  );

  

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      YEAR,
      MONTH - 1,
      1
    ).getDay();

    const lastDate = new Date(
      YEAR,
      MONTH,
      0
    ).getDate();

    const days: (
      number | null
    )[] = [];

    // 월요일 시작
    const mondayStart =
      firstDay === 0
        ? 6
        : firstDay - 1;

    // 빈 칸
    for (
      let i = 0;
      i < mondayStart;
      i++
    ) {
      days.push(null);
    }

    // 날짜
    for (
      let day = 1;
      day <= lastDate;
      day++
    ) {
      days.push(day);
    }

    return days;
  }, []);



  const getDateKey = (
    day: number
  ) => {
    return `${YEAR}-${String(
      MONTH
    ).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };



  const handleDayPress = (
    day: number
  ) => {
    const record =
      RECORDS[getDateKey(day)];

    if (!record) {
      return;
    }

    setSelectedRecord(record);
  };

  return (
    <View style={styles.container}>

     

      <View style={styles.header}>

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
          달력
        </Text>

        <View
          style={styles.headerRight}
        >

          <Pressable
            hitSlop={10}
            onPress={() =>
              router.push("/profile")
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

      
      <View
        style={styles.monthHeader}
      >

        <Pressable hitSlop={10}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>

        <View
          style={styles.monthTitle}
        >

          <Text
            style={styles.yearText}
          >
            {YEAR}
          </Text>

          <Text
            style={styles.monthText}
          >
            JULY
          </Text>

        </View>

        <Pressable hitSlop={10}>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>

      </View>

    

      <View style={styles.weekRow}>

        {[
          "월",
          "화",
          "수",
          "목",
          "금",
          "토",
          "일",
        ].map((day) => (
          <Text
            key={day}
            style={styles.weekText}
          >
            {day}
          </Text>
        ))}

      </View>


      <View
        style={styles.calendarGrid}
      >

        {calendarDays.map(
          (day, index) => {

            // 빈 칸
            if (day === null) {
              return (
                <View
                  key={`empty-${index}`}
                  style={styles.dayCell}
                />
              );
            }

            const record =
              RECORDS[getDateKey(day)];

            const hasRecord =
              !!record;

            return (
              <View
                key={day}
                style={styles.dayCell}
              >


                {record && (
                  <Image
                    source={getCharacter(
                      record.progress
                    )}
                    style={
                      styles.dayCharacter
                    }
                  />
                )}

                

                <Pressable
                  style={[
                    styles.dayCircle,
                    hasRecord &&
                      styles.recordDayCircle,
                  ]}
                  onPress={() =>
                    handleDayPress(day)
                  }
                  disabled={!hasRecord}
                >
                  <Text
                    style={styles.dayText}
                  >
                    {day}
                  </Text>
                </Pressable>

              </View>
            );
          }
        )}

      </View>



      <View
        style={styles.gaugeCard}
      >

        <GaugeRow
          character={character100}
          label="EDUGAUGE 100%"
          progress={100}
        />

        <GaugeRow
          character={character70}
          label="EDUGAUGE 70 - 99%"
          progress={75}
        />

        <GaugeRow
          character={character30}
          label="EDUGAUGE 30 - 69%"
          progress={50}
        />

        <GaugeRow
          character={character0}
          label="EDUGAUGE 0 - 29%"
          progress={22}
        />

      </View>

      

      <CalendarRecordModal
        visible={
          selectedRecord !== null
        }
        record={selectedRecord}
        onClose={() =>
          setSelectedRecord(null)
        }
      />

    </View>
  );
}


function GaugeRow({
  character,
  label,
  progress,
}: {
  character: ImageSourcePropType;
  label: string;
  progress: number;
}) {
  return (
    <View style={styles.gaugeRow}>

      

      <Image
        source={character}
        style={
          styles.gaugeCharacter
        }
      />

      

      <Text
        style={styles.gaugeLabel}
      >
        {label}
      </Text>

      

      <View
        style={styles.gaugeTrack}
      >
        <View
          style={[
            styles.gaugeProgress,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      

      <Text
        style={styles.gaugePercent}
      >
        {progress}%
      </Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071F30",
  },

  header: {
    height: 82,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    left: 18,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 15,
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

  monthHeader: {
    height: 70,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  monthTitle: {
    alignItems: "center",
  },

  yearText: {
    color: "#FFFFFF",
    fontSize: 10,
  },

  monthText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  weekRow: {
    flexDirection: "row",
    paddingHorizontal: 18,
  },

  weekText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 10,
    textAlign: "center",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
    marginTop: 6,
  },

  dayCell: {
    width: "14.2857%",
    height: 48,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  dayCharacter: {
    position: "absolute",
    top: -4,
    width: 24,
    height: 24,
    zIndex: 1,
    resizeMode: "contain",
  },

  dayCircle: {
    width: 32,
    height: 32,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#5C7180",
    justifyContent: "center",
    alignItems: "center",
  },

  recordDayCircle: {
    borderColor: "#6E7D89",
  },

  dayText: {
    color: "#FFFFFF",
    fontSize: 10,
  },

  gaugeCard: {
    marginHorizontal: 18,
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#465A68",
    borderRadius: 20,
  },

  gaugeRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
  },

  gaugeCharacter: {
    width: 28,
    height: 28,
    marginRight: 4,
    resizeMode: "contain",
  },

  gaugeLabel: {
    width: 92,
    color: "#FFFFFF",
    fontSize: 7,
  },

  gaugeTrack: {
    flex: 1,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#75828A",
    overflow: "hidden",
  },

  gaugeProgress: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },

  gaugePercent: {
    width: 30,
    color: "#FFFFFF",
    fontSize: 9,
    textAlign: "right",
  },
});