import type { TODO_KEY } from "../data/todo-data";

export class LocalStorabeWrapper {
  constructor(public storage: Storage) {}

  saveDate(key: TODO_KEY, item: Date) {
    this.storage.setItem(key, item.toISOString());
  }

  getSavedDate(key: TODO_KEY): Date | null {
    const val = this.storage.getItem(key);
    try {
      return val ? new Date(val) : null;
    } catch (e) {
      throw new Error(`${val} is invalid stored value`, { cause: e });
    }
  }

  delete(key: TODO_KEY) {
    this.storage.removeItem(key);
  }
}
