import { type Lang } from "../type/lang";
import { allElements } from "../util/array";
import { add, isMonday, nextMonday, set } from "../util/date";
import { jaVocaburary, VOCABULARY, type VocabularyKey } from "./i18n";

type LOCAL_SPECIALITIES_TODO_KEY =
  | "SILK_FLOWER"
  | "COR_LAPIS"
  | "DENDROBIUM"
  | "FLUORESCENT_FUNGUS"
  | "MOURNING_FLOWER"
  | "TRISHIRAITE"
  | "CALLA_LILY"
  | "CECILIA"
  | "DANDELION_SEED"
  | "PHILANEMO_MUSHROOM"
  | "SMALL_LAMP_GRASS"
  | "VALBERRY"
  | "WINDWHEEL_ASTER"
  | "GLAZE_LILY"
  | "QINGXIN"
  | "VIOLETGRASS"
  | "JUEYUN_CHILI"
  | "NOCTILUCOUS_JADE";

export type TODO_KEY =
  | "DAILY_MISSION_1"
  | "DAILY_MISSION_2"
  | "DAILY_MISSION_3"
  | "DAILY_MISSION_4"
  | "WEEKLY_BOSS_1"
  | "WEEKLY_BOSS_2"
  | "WEEKLY_BOSS_3"
  | "ARTIFACT_MARATHON"
  | LOCAL_SPECIALITIES_TODO_KEY
  | "CRYSTAL_CHUNK_1"
  | "CRYSTAL_CHUNK_2"
  | "CRYSTAL_CHUNK_3";

export const TODO_KEYS = allElements<TODO_KEY>()([
  "DAILY_MISSION_1",
  "DAILY_MISSION_2",
  "DAILY_MISSION_3",
  "DAILY_MISSION_4",
  "WEEKLY_BOSS_1",
  "WEEKLY_BOSS_2",
  "WEEKLY_BOSS_3",
  "ARTIFACT_MARATHON",
  "SILK_FLOWER",
  "COR_LAPIS",
  "DENDROBIUM",
  "FLUORESCENT_FUNGUS",
  "MOURNING_FLOWER",
  "TRISHIRAITE",
  "CALLA_LILY",
  "CECILIA",
  "DANDELION_SEED",
  "PHILANEMO_MUSHROOM",
  "SMALL_LAMP_GRASS",
  "VALBERRY",
  "WINDWHEEL_ASTER",
  "GLAZE_LILY",
  "QINGXIN",
  "VIOLETGRASS",
  "JUEYUN_CHILI",
  "NOCTILUCOUS_JADE",
  "CRYSTAL_CHUNK_1",
  "CRYSTAL_CHUNK_2",
  "CRYSTAL_CHUNK_3",
]);

export type CATEGORY_KEY =
  | "DAILY"
  | "WEEKLY"
  | "LOCAL_SPECIALITIES" // 特産品
  | "CRYSTAL_CHUNK"; // 水晶の塊

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

export interface TODO_VALUE {
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

  private static passed72H(lastUpdated: Date, now: Date) {
    const repopDate = add(lastUpdated, { hours: 72 });
    return now > repopDate;
  }

  static canFreeSpecialities(lastUpdated: Date, now: Date) {
    return FreeCheckLogic.passed48H(lastUpdated, now);
  }

  static canFreeCrystalChunk(lastUpdated: Date, now: Date) {
    return FreeCheckLogic.passed72H(lastUpdated, now);
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

export const dailyMissionLogic: Cateogory = {
  key: "DAILY",
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "DAILY_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "DAILY_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeDailyTodo,
  },
};

const weeklyMissionLogic: Cateogory = {
  key: "WEEKLY",
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "WEEKLY_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "WEEKLY_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeWeeklyTodo,
  },
};

const localSpecialitiesLogic: Cateogory = {
  key: "LOCAL_SPECIALITIES",
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "LOCAL_SPECIALITIES_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "LOCAL_SPECIALITIES_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeSpecialities,
  },
};

const cristalChunkLogic: Cateogory = {
  key: "CRYSTAL_CHUNK",
  name: (lang: Lang): string =>
    translateByLangAndKey(lang, "CRYSTAL_CHUNK_CATEGORY_NAME"),
  logic: {
    descriptipon: (lang: Lang): string =>
      translateByLangAndKey(lang, "CRYSTAL_CHUNK_CATEGORY_DESCRIPTION"),
    func: FreeCheckLogic.canFreeCrystalChunk,
  },
};

export const categories: { [x in CATEGORY_KEY]: Cateogory } = {
  DAILY: dailyMissionLogic,
  WEEKLY: weeklyMissionLogic,
  LOCAL_SPECIALITIES: localSpecialitiesLogic,
  CRYSTAL_CHUNK: cristalChunkLogic,
};

export const TODO_DATA: Record<TODO_KEY, TODO_VALUE> = {
  /**
   * １つ目のデイリーミッション
   */
  DAILY_MISSION_1: {
    category: categories.DAILY,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_1"),
  },
  /**
   * ２つ目のデイリーミッション
   */
  DAILY_MISSION_2: {
    category: categories.DAILY,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_2"),
  },
  /**
   * 3つ目のデイリーミッション
   */
  DAILY_MISSION_3: {
    category: categories.DAILY,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_3"),
  },
  /**
   * 4つ目のデイリーミッション
   */
  DAILY_MISSION_4: {
    category: categories.DAILY,
    name: (lang) => translateByLangAndKey(lang, "DAILY_MISSION_4"),
  },
  WEEKLY_BOSS_1: {
    category: categories.WEEKLY,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_1"),
  },
  WEEKLY_BOSS_2: {
    category: categories.WEEKLY,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_2"),
  },
  WEEKLY_BOSS_3: {
    category: categories.WEEKLY,
    name: (lang) => translateByLangAndKey(lang, "WEEKLY_BOSS_3"),
  },
  ARTIFACT_MARATHON: {
    category: categories.DAILY,
    name: (lang) => translateByLangAndKey(lang, "ARTIFACT_MARATHON"),
  },
  SILK_FLOWER: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "SILK_FLOWER"),
  },
  DENDROBIUM: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "DENDROBIUM"),
  },
  COR_LAPIS: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "COR_LAPIS"),
  },
  FLUORESCENT_FUNGUS: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "FLUORESCENT_FUNGUS"),
  },
  MOURNING_FLOWER: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "MOURNING_FLOWER"),
  },
  TRISHIRAITE: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "TRISHIRAITE"),
  },
  CALLA_LILY: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "CALLA_LILY"),
  },
  CECILIA: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "CECILIA"),
  },
  DANDELION_SEED: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "DANDELION_SEED"),
  },
  PHILANEMO_MUSHROOM: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "PHILANEMO_MUSHROOM"),
  },
  SMALL_LAMP_GRASS: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "SMALL_LAMP_GRASS"),
  },
  VALBERRY: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "VALBERRY"),
  },
  WINDWHEEL_ASTER: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "WINDWHEEL_ASTER"),
  },
  GLAZE_LILY: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "GLAZE_LILY"),
  },
  QINGXIN: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "QINGXIN"),
  },
  VIOLETGRASS: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "VIOLETGRASS"),
  },
  JUEYUN_CHILI: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "JUEYUN_CHILI"),
  },
  NOCTILUCOUS_JADE: {
    category: categories.LOCAL_SPECIALITIES,
    name: (lang) => translateByLangAndKey(lang, "NOCTILUCOUS_JADE"),
  },
  CRYSTAL_CHUNK_1: {
    category: categories.CRYSTAL_CHUNK,
    name: (lang) => translateByLangAndKey(lang, "CRYSTAL_CHUNK_1"),
  },
  CRYSTAL_CHUNK_2: {
    category: categories.CRYSTAL_CHUNK,
    name: (lang) => translateByLangAndKey(lang, "CRYSTAL_CHUNK_2"),
  },
  CRYSTAL_CHUNK_3: {
    category: categories.CRYSTAL_CHUNK,
    name: (lang) => translateByLangAndKey(lang, "CRYSTAL_CHUNK_3"),
  },
};
