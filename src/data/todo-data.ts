import { type Lang } from "../type/lang";
import { allElements } from "../util/array";
import { add, isMonday, nextMonday, set } from "../util/date";
import { jaVocaburary, VOCABULARY, type VocabularyKey } from "./i18n";

export type TODO_KEY =
  | "mission1"
  | "mission2"
  | "mission3"
  | "mission4"
  | "weekly_boss1"
  | "weekly_boss2"
  | "weekly_boss3"
  | "silk_flower"
  | "COR_LAPIS"
  | "DENDROBIUM"
  | "FLUORESCENT_FUNGUS"
  | "MOURNING_FLOWER"
  | "TRISHIRAITE";

export const TODO_KEYS = allElements<TODO_KEY>()([
  "mission1",
  "mission2",
  "mission3",
  "mission4",
  "weekly_boss1",
  "weekly_boss2",
  "weekly_boss3",
  "silk_flower",
  "COR_LAPIS",
  "DENDROBIUM",
  "FLUORESCENT_FUNGUS",
  "MOURNING_FLOWER",
  "TRISHIRAITE",
]);

export type CATEGORY_KEY =
  | "daily_mission"
  | "weekly_mission"
  | "local_specialties"; // 特産品

interface Logic {
  descriptipon: (lang: Lang) => string;
  /**
   * TODO がリセットされたか判断する関数。
   * ユーザーがTODOを完了した日付を受け取り、そのTODOがリセットされたかどうかを判断する。
   * @params lastUpdated ユーザーがTODOを完了した日付
   * @return boolean TODOをリセットすべきなら true そうでないなら false
   */
  func: (lastUpdated: Date, now: Date) => boolean;
}

type Cateogory = {
  key: CATEGORY_KEY;
  name: (lang: Lang) => string;
  logic: Logic;
};

interface TODO_VALUE {
  name: (lang: Lang) => string;
  category: Cateogory;
}

export class FreeCheckLogic {
  /**
   * デイリーミッションのTODOチェック解除ロジック
   * * TODO完了時点の次の AM5:00 に解除される。
   * @param lastUpdated lastUpdated ユーザーがTODOを完了した日付
   * @returns boolean TODOをリセットすべきなら true そうでないなら false
   */
  static canFreeDailyTodo(lastUpdated: Date, now: Date) {
    const hour = lastUpdated.getHours();
    let dead: Date;
    if (0 <= hour && hour < 5) {
      dead = set(lastUpdated, { hours: 5, minutes: 0, seconds: 0 });
    } else {
      dead = set(add(lastUpdated, { days: 1 }), {
        hours: 5,
        minutes: 0,
        seconds: 0,
      });
    }
    return now > dead;
  }

  /**
   * weekly TODOチェック解除ロジック
   * * TODO完了時点の次の月曜 AM5:00 に解除される。
   * @param lastUpdated lastUpdated ユーザーがTODOを完了した日付
   * @returns boolean TODOをリセットすべきなら true そうでないなら false
   */
  static canFreeWeeklyTodo(lastUpdated: Date, now: Date) {
    let dead: Date;
    if (isMonday(lastUpdated)) {
      dead = set(lastUpdated, {
        hours: 5,
        minutes: 0,
        seconds: 0,
      });
    } else {
      dead = set(nextMonday(lastUpdated), {
        hours: 5,
        minutes: 0,
        seconds: 0,
      });
    }
    return now > dead;
  }

  private static passed48H(lastUpdated: Date, now: Date) {
    const repopDate = add(lastUpdated, { hours: 48 });
    return now > repopDate;
  }

  static canFreeSpecialities(lastUpdated: Date, now: Date) {
    return FreeCheckLogic.passed48H(lastUpdated, now);
  }
}

const translateByLangAndKey = (lang: Lang, categoryKey: VocabularyKey) => {
  const vocav = VOCABULARY[lang][categoryKey];
  if (!vocav) {
    console.warn(`lang: ${lang} の ${categoryKey} がありません。`);
    return `${jaVocaburary[categoryKey]} (translate is needed.)`;
  }
  return vocav;
};

export const dailyMissionLogic = {
  key: "daily_mission" as const,
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "DAILY_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "DAILY_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeDailyTodo,
  },
};

const weeklyMissionLogic = {
  key: "weekly_mission" as const,
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "WEEKLY_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "WEEKLY_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeDailyTodo,
  },
};

const localSpecialitiesLogic = {
  key: "local_specialties" as const,
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "LOCAL_SPECIALITIES_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "LOCAL_SPECIALITIES_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeSpecialities,
  },
};

export const categories: { [x in CATEGORY_KEY]: Cateogory } = {
  daily_mission: dailyMissionLogic,
  weekly_mission: weeklyMissionLogic,
  local_specialties: localSpecialitiesLogic,
};

export const TODO_DATA: Record<TODO_KEY, TODO_VALUE> = {
  /**
   * １つ目のデイリーミッション
   */
  mission1: {
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_1_NAME"),
  },
  /**
   * ２つ目のデイリーミッション
   */
  mission2: {
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_2_NAME"),
  },
  /**
   * 3つ目のデイリーミッション
   */
  mission3: {
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_3_NAME"),
  },
  /**
   * 4つ目のデイリーミッション
   */
  mission4: {
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_4_NAME"),
  },
  weekly_boss1: {
    category: categories.weekly_mission,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_1_NAME"),
  },
  weekly_boss2: {
    category: categories.weekly_mission,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_2_NAME"),
  },
  weekly_boss3: {
    category: categories.weekly_mission,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_3_NAME"),
  },
  silk_flower: {
    category: categories.local_specialties,
    name: (lang) => translateByLangAndKey(lang, "SILK_FLOWER"),
  },
  DENDROBIUM: {
    category: categories.local_specialties,
    name: (lang) => translateByLangAndKey(lang, "DENDROBIUM"),
  },
  COR_LAPIS: {
    category: categories.local_specialties,
    name: (lang) => translateByLangAndKey(lang, "COR_LAPIS"),
  },
  FLUORESCENT_FUNGUS: {
    category: categories.local_specialties,
    name: (lang) => translateByLangAndKey(lang, "FLUORESCENT_FUNGUS"),
  },
  MOURNING_FLOWER: {
    category: categories.local_specialties,
    name: (lang) => translateByLangAndKey(lang, "MOURNING_FLOWER"),
  },
  TRISHIRAITE: {
    category: categories.local_specialties,
    name: (lang) => translateByLangAndKey(lang, "TRISHIRAITE"),
  },
};
