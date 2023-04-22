import type { Lang } from "../type/lang";
import { type CATEGORY_KEY, type TODO_KEY } from "./todo-data";

export type VocabularyKey =
  | "PAGE_TITLE"
  | "PAGE_DESCRIPTION"
  | `${CATEGORY_KEY}_CATEGORY_NAME`
  | `${CATEGORY_KEY}_CATEGORY_DESCRIPTION`
  | `${TODO_KEY}`;

type Vocabulary = { [x in VocabularyKey]: string };

export type VocabularyByLang = {
  [x in Lang]: {
    [x in VocabularyKey]?: string;
  };
};

/**
 * @see https://genshin-dictionary.com/ja/tags/specialty/
 */
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
  DAILY_MISSION_1: "デイリーミッション１",
  DAILY_MISSION_2: "デイリーミッション２",
  DAILY_MISSION_3: "デイリーミッション３",
  DAILY_MISSION_4: "デイリーミッション４",
  WEEKLY_BOSS_1: "週時ボス(1)",
  WEEKLY_BOSS_2: "週時ボス(2)",
  WEEKLY_BOSS_3: "週時ボス(3)",
  ARTIFACT_MARATHON: "聖遺物マラソン",
  SILK_FLOWER: "霓裳花",
  COR_LAPIS: "石珀",
  DENDROBIUM: "血石華",
  FLUORESCENT_FUNGUS: "ユウトウタケ",
  MOURNING_FLOWER: "悼霊花",
  TRISHIRAITE: "サングイト",
  CALLA_LILY: "ドドリアン",
  CECILIA: "セシリアの花",
  DANDELION_SEED: "蒲公英の種",
  PHILANEMO_MUSHROOM: "慕風のマッシュルーム",
  SMALL_LAMP_GRASS: "イグサ",
  VALBERRY: "ヴァルベリー",
  WINDWHEEL_ASTER: "風車アスター",
  GLAZE_LILY: "瑠璃百合",
  QINGXIN: "清心",
  VIOLETGRASS: "瑠璃袋",
  JUEYUN_CHILI: "絶雲の唐辛子",
  NOCTILUCOUS_JADE: "夜泊石",
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
