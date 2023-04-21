import type { Lang } from "../type/lang";

export type VocabularyKey =
  | "PAGE_TITLE"
  | "PAGE_DESCRIPTION"
  | "DAILY_CATEGORY_NAME"
  | "DAILY_CATEGORY_DESCRIPTION"
  | "WEEKLY_CATEGORY_NAME"
  | "WEEKLY_CATEGORY_DESCRIPTION";

type Vocabulary = { [x in VocabularyKey]: string };

export type VocabularyByLang = {
  [x in Lang]: {
    PAGE_TITLE: string;
    PAGE_DESCRIPTION: string;
    DAILY_CATEGORY_NAME?: string;
    DAILY_CATEGORY_DESCRIPTION?: string;
    WEEKLY_CATEGORY_NAME?: string;
    WEEKLY_CATEGORY_DESCRIPTION?: string;
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
};

export const VOCABULARY: VocabularyByLang = {
  ja: jaVocaburary,
  en: {
    PAGE_TITLE: "Genshin todo list",
    PAGE_DESCRIPTION:
      "A Genshin TODO list and management tool for everyone! A variety of TODO tasks are available and can be customized.",
    DAILY_CATEGORY_NAME: "Daily TODO",
  },
};
