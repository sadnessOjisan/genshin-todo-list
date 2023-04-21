import type { Lang } from "../type/lang";

type Vocabulary = {
  [x in Lang]: {
    PAGE_TITLE: string;
    PAGE_DESCRIPTION: string;
  };
};

export const VOCABULARY: Vocabulary = {
  ja: {
    PAGE_TITLE: "原神TODOリスト",
    PAGE_DESCRIPTION:
      "皆で作る原神TODOリスト、管理ツールです。多様なTODOが用意されており、カスタマイズも可能です。",
  },
  en: {
    PAGE_TITLE: "Genshin todo list",
    PAGE_DESCRIPTION:
      "A Genshin TODO list and management tool for everyone! A variety of TODO tasks are available and can be customized.",
  },
};
