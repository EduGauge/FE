import { Ionicons } from "@expo/vector-icons";
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
import Header from "../../../components/Header";


// 테스트용 날짜
const YEAR = 2026;
const MONTH = 7;



const character100 = require(
  "../../../assets/characters/calendar_record_1.png"
);

const character70 = require(
  "../../../assets/characters/calendar_record_2.png"
);

const character30 = require(
  "../../../assets/characters/calendar_record_3.png"
);

const character0 = require(
  "../../../assets/characters/calendar_record_4.png"
);



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


// 테스트 기록

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

    // 실제 인증샷 URI가 연결되면 여기에 들어오도록 사용
    // photoUri: "...",

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

    // 실제 인증샷 URI가 연결되면 여기에 들어오도록 사용
    // photoUri: "...",

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

    for (
      let i = 0;
      i < mondayStart;
      i++
    ) {
      days.push(null);
    }

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


  const TEST_TODAY_DAY = 3;

  const isFutureDate = (
    day: number
  ) => {
    return day > TEST_TODAY_DAY;
  };

  return (
    <View style={styles.container}>

      <Header title="" variant="logo" />

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
          <Text style={styles.yearText}>
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
                  style={
                    styles.dayCell
                  }
                />
              );
            }

            const record =
              RECORDS[getDateKey(day)];

            const hasRecord =
              !!record;

            const future =
              isFutureDate(day);

            const completed =
              !!record &&
              record.progress >= 100 &&
              record.photo === true;

            return (
              <View
                key={day}
                style={styles.dayCell}
              >

                

                <Pressable
                  style={[
                    styles.dayCircle,

                    hasRecord &&
                      styles.recordDayCircle,

                    completed &&
                      styles.completedDayCircle,

                    future &&
                      styles.futureDayCircle,
                  ]}
                  onPress={() =>
                    handleDayPress(day)
                  }
                  disabled={
                    !hasRecord
                  }
                >

                  

                  {completed &&
                    record.photoUri && (
                      <Image
                        source={{
                          uri: record.photoUri,
                        }}
                        style={
                          styles.dayPhoto
                        }
                        resizeMode="cover"
                      />
                    )}

                 
                  {hasRecord &&
                    !future && (
                      <Image
                        source={getCharacter(
                          record.progress
                        )}
                        style={
                          styles.dayCharacter
                        }
                        resizeMode="contain"
                      />
                    )}

                 
                  <View
                    style={[
                      styles.dayNumberContainer,

                      completed &&
                        styles.completedDayNumberContainer,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,

                        completed &&
                          styles.completedDayText,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>

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
          progress={10}
        />

        <GaugeRow
          character={character70}
          label="EDUGAUGE 70 - 99%"
          progress={25}
        />

        <GaugeRow
          character={character30}
          label="EDUGAUGE 30 - 69%"
          progress={60}
        />

        <GaugeRow
          character={character0}
          label="EDUGAUGE 0 - 29%"
          progress={5}
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
        resizeMode="contain"
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

    height: 58,

    justifyContent: "center",
    alignItems: "center",
  },


  dayCircle: {
    position: "relative",

    width: 46,
    height: 46,

    borderRadius: 23,

    borderWidth: 1,
    borderColor: "#5C7180",

    backgroundColor: "transparent",

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  recordDayCircle: {
    backgroundColor: "#465A68",

    borderColor: "#71808B",
  },

  completedDayCircle: {
    borderColor: "#FFFFFF",
    backgroundColor: "#465A68",
  },


  dayPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

 
  dayCharacter: {
    position: "absolute",
    width: 31,
    height: 31,
    top: 4,
    zIndex: 2,
  },

  dayNumberContainer: {
    position: "absolute",

    bottom: 2,

    minWidth: 17,
    minHeight: 14,

    paddingHorizontal: 2,

    borderRadius: 7,

    backgroundColor: "#071F30",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 3,
  },

  completedDayNumberContainer: {
    backgroundColor: "rgba(7, 31, 48, 0.72)",
  },

  dayText: {
    color: "#FFFFFF",

    fontSize: 8,
    fontWeight: "600",

    textAlign: "center",
  },

  completedDayText: {
    color: "#FFFFFF",
  },

  futureDayCircle: {
    backgroundColor: "transparent",

    borderColor: "#5C7180",
  },

  /* =====================================================
     Gauge Card
     ===================================================== */

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
    width: 32,
    height: 28,

    marginRight: 10,
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