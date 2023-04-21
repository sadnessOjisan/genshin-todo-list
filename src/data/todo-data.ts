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
  | "weekly_boss3";

export const TODO_KEYS = allElements<TODO_KEY>()([
  "mission1",
  "mission2",
  "mission3",
  "mission4",
  "weekly_boss1",
  "weekly_boss2",
  "weekly_boss3",
]);

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

export type CATEGORY_KEY = "daily_mission" | "weekly_mission";

type Cateogory = {
  key: CATEGORY_KEY;
  name: (lang: Lang) => string;
  logic: Logic;
};

interface TODO_VALUE {
  description: string;
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

export const categories: { [x in CATEGORY_KEY]: Cateogory } = {
  daily_mission: dailyMissionLogic,
  weekly_mission: weeklyMissionLogic,
};

export const TODO_DATA: Record<TODO_KEY, TODO_VALUE> = {
  /**
   * １つ目のデイリーミッション
   */
  mission1: {
    description: "daily mission(1)",
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_1_NAME"),
  },
  /**
   * ２つ目のデイリーミッション
   */
  mission2: {
    description: "daily mission(2)",
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_2_NAME"),
  },
  /**
   * 3つ目のデイリーミッション
   */
  mission3: {
    description: "daily mission(2)",
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_3_NAME"),
  },
  /**
   * 4つ目のデイリーミッション
   */
  mission4: {
    description: "daily mission(4)",
    category: categories.daily_mission,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_4_NAME"),
  },
  weekly_boss1: {
    description: "weekly boss (1)",
    category: categories.weekly_mission,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_1_NAME"),
  },
  weekly_boss2: {
    description: "weekly boss (2)",
    category: categories.weekly_mission,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_2_NAME"),
  },
  weekly_boss3: {
    description: "weekly boss (3)",
    category: categories.weekly_mission,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_3_NAME"),
  },
};
