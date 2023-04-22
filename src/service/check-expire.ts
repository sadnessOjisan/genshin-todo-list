import { type TODO_KEY, TODO_KEYS, TODO_DATA } from "../data/todo-data";
import { LocalStorabeWrapper } from "../repository/local-storage";

export type ExpireDateState = { [x in TODO_KEY]: Date | null };

export const createInitialState = (): ExpireDateState => ({
  DAILY_MISSION_1: null,
  DAILY_MISSION_2: null,
  DAILY_MISSION_3: null,
  DAILY_MISSION_4: null,
  WEEKLY_BOSS_1: null,
  WEEKLY_BOSS_2: null,
  WEEKLY_BOSS_3: null,
  ARTIFACT_MARATHON: null,
  SILK_FLOWER: null,
  COR_LAPIS: null,
  DENDROBIUM: null,
  FLUORESCENT_FUNGUS: null,
  MOURNING_FLOWER: null,
  TRISHIRAITE: null,
  CALLA_LILY: null,
  CECILIA: null,
  DANDELION_SEED: null,
  PHILANEMO_MUSHROOM: null,
  SMALL_LAMP_GRASS: null,
  VALBERRY: null,
  WINDWHEEL_ASTER: null,
  GLAZE_LILY: null,
  QINGXIN: null,
  VIOLETGRASS: null,
  JUEYUN_CHILI: null,
  NOCTILUCOUS_JADE: null,
  CRYSTAL_CHUNK_1: null,
  CRYSTAL_CHUNK_2: null,
  CRYSTAL_CHUNK_3: null,
});

export const getAllTodosExpireDates = (storage: LocalStorabeWrapper) => {
  const map: ExpireDateState = createInitialState();
  TODO_KEYS.forEach((todoKey) => {
    map[todoKey] = storage.getSavedDate(todoKey);
  });
  return map;
};

export const updateAllTodosExpire = (
  state: ExpireDateState,
  storage: LocalStorabeWrapper
) => {
  TODO_KEYS.forEach((todoKey) => {
    const date = state[todoKey];
    const now = new Date();
    if (date === null) return;
    const shouldReleasae = TODO_DATA[todoKey].category.logic.func(date, now);
    if (shouldReleasae) {
      storage.delete(todoKey);
    }
  });
  return getAllTodosExpireDates(storage);
};
