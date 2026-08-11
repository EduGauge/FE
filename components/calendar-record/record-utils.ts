import { ImageSourcePropType } from "react-native";

const character100 = require("../../assets/characters/calendar_record_1.png");
const character70 = require("../../assets/characters/calendar_record_2.png");
const character30 = require("../../assets/characters/calendar_record_3.png");
const character0 = require("../../assets/characters/calendar_record_4.png");

export type RecordMessage = {
  first: string;
  second: string;
};

export const getCharacter = (progress: number): ImageSourcePropType => {
  if (progress >= 100) return character100;
  if (progress >= 70) return character70;
  if (progress >= 30) return character30;
  return character0;
};

export const getRecordMessage = (progress: number): RecordMessage => {
  if (progress >= 100) {
    return { first: "오늘의 에듀게이지는", second: "100%!!!!" };
  }

  if (progress >= 70) {
    return {
      first: "에듀게이지 100이 눈앞에 있어요!",
      second: "다음에는 더더더 화이팅~",
    };
  }

  if (progress >= 30) {
    return {
      first: "아직 게이지를 다 채우지 못했어요...",
      second: "좀 더 열심히 해볼까요~?",
    };
  }

  return { first: "차근차근 하나씩", second: "도전해보아요!" };
};

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}
