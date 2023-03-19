export interface Vocabulary {
  jushi: string;
  mission1: string;
  mission2: string;
  mission3: string;
  mission4: string;
  weekly_boss1: string;
  weekly_boss2: string;
  weekly_boss3: string;
}

const enVocabulary: Vocabulary = {
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
