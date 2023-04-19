import { type TODO_KEY, TODO_KEYS } from "../data/todo-data";

export const isTodo = (x: unknown): x is TODO_KEY => {
  return TODO_KEYS.includes(x as any);
};
