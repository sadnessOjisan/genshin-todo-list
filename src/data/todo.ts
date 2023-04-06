export const KEYS = {
  TITLE: "title",
  RESET_LOCAL_STORAGE: "reset_local_storage",
  JUSHI: "jushi",
  MISSION1: "mission1",
  MISSION2: "mission2",
  MISSION3: "mission3",
  MISSION4: "mission4",
  WEEKLY_BOSS1: "weekly_boss1",
  WEEKLY_BOSS2: "weekly_boss2",
  WEEKLY_BOSS3: "weekly_boss3",
} as const;

export interface Vocabulary {
  [KEYS.TITLE]: string;
  [KEYS.RESET_LOCAL_STORAGE]: string;
  [KEYS.JUSHI]: string;
  [KEYS.MISSION1]: string;
  [KEYS.MISSION2]: string;
  [KEYS.MISSION3]: string;
  [KEYS.MISSION4]: string;
  [KEYS.WEEKLY_BOSS1]: string;
  [KEYS.WEEKLY_BOSS2]: string;
  [KEYS.WEEKLY_BOSS3]: string;
}

const enVocabulary: Vocabulary = {
  title: "genshin todo manage system",
  reset_local_storage: "reset all todos",
  jushi: "jushi syohi",
  mission1: "mission1",
  mission2: "mission2",
  mission3: "mission3",
  mission4: "mission4",
  weekly_boss1: "weekly boss1",
  weekly_boss2: "weekly boss2",
  weekly_boss3: "weekly boss3",
} as const;

const jaVocabulary: Vocabulary = {
  title: "原神TODO管理システム",
  reset_local_storage: "TODOを全てリセットする",
  jushi: "樹脂消費",
  mission1: "ミッション1",
  mission2: "ミッション2",
  mission3: "ミッション3",
  mission4: "ミッション4",
  weekly_boss1: "週ボス1",
  weekly_boss2: "週ボス2",
  weekly_boss3: "週ボス3",
} as const;

export const vocabulary: Record<"ja" | "en", Vocabulary> = {
  ja: jaVocabulary,
  en: enVocabulary,
};
