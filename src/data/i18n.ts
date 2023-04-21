import type { Lang } from "../type/lang";
import { CATEGORY_KEY, type TODO_KEY } from "./todo-data";

export type VocabularyKey =
  | "PAGE_TITLE"
  | "PAGE_DESCRIPTION"
  | "DAILY_CATEGORY_NAME"
  | "DAILY_CATEGORY_DESCRIPTION"
  | "WEEKLY_CATEGORY_NAME"
  | "WEEKLY_CATEGORY_DESCRIPTION"
  | `${Extract<TODO_KEY, "DAILY_MISSION_1">}_NAME`
  | `${Extract<TODO_KEY, "DAILY_MISSION_2">}_NAME`
  | `${Extract<TODO_KEY, "DAILY_MISSION_3">}_NAME`
  | `${Extract<TODO_KEY, "DAILY_MISSION_4">}_NAME`
  | `${Extract<TODO_KEY, "WEEKLY_BOSS_1">}_NAME`
  | `${Extract<TODO_KEY, "WEEKLY_BOSS_2">}_NAME`
  | `${Extract<TODO_KEY, "WEEKLY_BOSS_3">}_NAME`
  | `${Extract<CATEGORY_KEY, "CRYSTAL_CHUNK">}_CATEGORY_NAME`
  | `${Extract<CATEGORY_KEY, "CRYSTAL_CHUNK">}_CATEGORY_DESCRIPTION`
  | "ARTIFACT_MARATHON_1"
  | "ARTIFACT_MARATHON_2"
  | "ARTIFACT_MARATHON_3"
  | "LOCAL_SPECIALITIES_CATEGORY_NAME"
  | "LOCAL_SPECIALITIES_CATEGORY_DESCRIPTION"
  | "SILK_FLOWER"
  | "COR_LAPIS"
  | "DENDROBIUM"
  | "FLUORESCENT_FUNGUS"
  | "MOURNING_FLOWER"
  | "TRISHIRAITE"
  | "CALLA_LILY"
  | "CECILIA"
  | "CRYSTAL_CHUNK_1"
  | "CRYSTAL_CHUNK_2"
  | "CRYSTAL_CHUNK_3";

type Vocabulary = { [x in VocabularyKey]: string };

export type VocabularyByLang = {
  [x in Lang]: {
    [x in VocabularyKey]?: string;
  };
};

export const jaVocaburary: Required<Vocabulary> = {
  PAGE_TITLE: "原神TODOリスト",
  PAGE_DESCRIPTION:
    "皆で作る原神TODOリスト、管理ツールです。多様なTODOが用意されており、カスタマイズも可能です。",
  DAILY_CATEGORY_NAME: "デイリーTODO",
  DAILY_CATEGORY_DESCRIPTION: "TODO完了時点の次の AM5:00 に解除される。",
  WEEKLY_CATEGORY_NAME: "ウィークリーTODO",
  WEEKLY_CATEGORY_DESCRIPTION:
    "TODO完了時点の次の月曜日の AM5:00 に解除される。",
  LOCAL_SPECIALITIES_CATEGORY_NAME: "特産品",
  LOCAL_SPECIALITIES_CATEGORY_DESCRIPTION: "取得 48時間後に解除される。",
  CRYSTAL_CHUNK_CATEGORY_NAME: "水晶の塊",
  CRYSTAL_CHUNK_CATEGORY_DESCRIPTION:
    "72時間でリポップします。マラソンコースを３つ作っておいて毎日回るのが良いでしょう。",
  DAILY_MISSION_1_NAME: "デイリーミッション１",
  DAILY_MISSION_2_NAME: "デイリーミッション２",
  DAILY_MISSION_3_NAME: "デイリーミッション３",
  DAILY_MISSION_4_NAME: "デイリーミッション４",
  WEEKLY_BOSS_1_NAME: "週時ボス(1)",
  WEEKLY_BOSS_2_NAME: "週時ボス(2)",
  WEEKLY_BOSS_3_NAME: "週時ボス(3)",
  ARTIFACT_MARATHON_1: "聖遺物マラソン１",
  ARTIFACT_MARATHON_2: "聖遺物マラソン２",
  ARTIFACT_MARATHON_3: "聖遺物マラソン３",
  SILK_FLOWER: "霓裳花",
  COR_LAPIS: "石珀",
  DENDROBIUM: "血石華",
  FLUORESCENT_FUNGUS: "ユウトウタケ",
  MOURNING_FLOWER: "悼霊花",
  TRISHIRAITE: "サングイト",
  CALLA_LILY: "ドドリアン",
  CECILIA: "セシリアの花",
  CRYSTAL_CHUNK_1: "水晶の塊マラソン１",
  CRYSTAL_CHUNK_2: "水晶の塊マラソン２",
  CRYSTAL_CHUNK_3: "水晶の塊マラソン３",
};

export const enVocaburary: VocabularyByLang["en"] = {
  PAGE_TITLE: "Genshin todo list",
  PAGE_DESCRIPTION:
    "A Genshin TODO list and management tool for everyone! A variety of TODO tasks are available and can be customized.",
  DAILY_CATEGORY_NAME: "Daily TODO",
};

export const VOCABULARY: VocabularyByLang = {
  ja: jaVocaburary,
  en: enVocaburary,
};
