import type { TODO_KEY } from "../data/todo-data";

class LocalStorabeWrapper {
  constructor(public storage: Storage) {}

  save(key: TODO_KEY, item: string) {
    this.storage.setItem(key, item);
  }

  get(key: TODO_KEY) {
    const val = this.storage.getItem(key);
    return val;
  }

  delete(key: TODO_KEY) {
    this.storage.removeItem(key);
  }
}

export const myStorage = new LocalStorabeWrapper(window.localStorage);
