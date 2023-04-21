import type { Lang } from "../type/lang";

export type VocabularyKey =
  | "PAGE_TITLE"
  | "PAGE_DESCRIPTION"
  | "DAILY_CATEGORY_NAME"
  | "DAILY_CATEGORY_DESCRIPTION"
  | "WEEKLY_CATEGORY_NAME"
  | "WEEKLY_CATEGORY_DESCRIPTION"
  | "DAILY_MISSION_1_NAME"
  | "DAILY_MISSION_2_NAME"
  | "DAILY_MISSION_3_NAME"
  | "DAILY_MISSION_4_NAME"
  | "WEEKLY_BOSS_1_NAME"
  | "WEEKLY_BOSS_2_NAME"
  | "WEEKLY_BOSS_3_NAME";

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
  DAILY_MISSION_1_NAME: "デイリーミッション１",
  DAILY_MISSION_2_NAME: "デイリーミッション２",
  DAILY_MISSION_3_NAME: "デイリーミッション３",
  DAILY_MISSION_4_NAME: "デイリーミッション４",
  WEEKLY_BOSS_1_NAME: "週時ボス(1)",
  WEEKLY_BOSS_2_NAME: "週時ボス(2)",
  WEEKLY_BOSS_3_NAME: "週時ボス(3)",
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
