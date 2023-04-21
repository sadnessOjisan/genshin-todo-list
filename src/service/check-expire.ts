import { type TODO_KEY, TODO_KEYS, TODO_DATA } from "../data/todo-data";
import { LocalStorabeWrapper } from "../repository/local-storage";

export type ExpireDateState = { [x in TODO_KEY]: Date | null };

export const createInitialState = () => ({
  mission1: null,
  mission2: null,
  mission3: null,
  mission4: null,
  weekly_boss1: null,
  weekly_boss2: null,
  weekly_boss3: null,
  silk_flower: null,
  COR_LAPIS: null,
  DENDROBIUM: null,
  FLUORESCENT_FUNGUS: null,
  MOURNING_FLOWER: null,
  TRISHIRAITE: null,
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
