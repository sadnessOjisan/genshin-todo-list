import { type Lang } from "../type/lang";
import { allElements } from "../util/array";

type Cateogory = "daily_mission" | "weekly_mission";

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
  func: (lastUpdated: Date) => boolean;
}

interface TODO_VALUE {
  description: string;

  logic: Logic;
  name: (lang: Lang) => string;
  category: Cateogory;
}

/**
 * デイリーミッションのTODOチェック解除ロジック
 * * TODO完了時点の次の AM5:00 に解除される。
 * @param lastUpdated lastUpdated ユーザーがTODOを完了した日付
 * @returns boolean TODOをリセットすべきなら true そうでないなら false
 */
const dailyLogic = (lastUpdated: Date) => {
  console.log(lastUpdated);
  return false;
};

/**
 * weeklyのTODOチェック解除ロジック
 * * TODO完了時点の次の AM5:00 に解除される。
 * @param lastUpdated lastUpdated ユーザーがTODOを完了した日付
 * @returns boolean TODOをリセットすべきなら true そうでないなら false
 */
const weeklyLogic = (lastUpdated: Date) => {
  console.log(lastUpdated);
  return false;
};

export const TODO_DATA: Record<TODO_KEY, TODO_VALUE> = {
  /**
   * １つ目のデイリーミッション
   */
  mission1: {
    description: "daily mission(1)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "TODO完了時点の次の AM5:00 に解除される。";
          case "en":
            return "next am 5:00";
          default:
            return "TODO完了時点の次の AM5:00 に解除される。";
        }
      },
      func: dailyLogic,
    },
    category: "daily_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "デイリーミッション1";
        case "en":
          return "daily mission1";
        default:
          return "デイリーミッション1";
      }
    },
  },
  /**
   * ２つ目のデイリーミッション
   */
  mission2: {
    description: "daily mission(2)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "TODO完了時点の次の AM5:00 に解除される。";
          case "en":
            return "next am 5:00";
          default:
            return "TODO完了時点の次の AM5:00 に解除される。";
        }
      },
      func: dailyLogic,
    },
    category: "daily_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "デイリーミッション2";
        case "en":
          return "daily mission2";
        default:
          return "デイリーミッション2";
      }
    },
  },
  /**
   * 3つ目のデイリーミッション
   */
  mission3: {
    description: "daily mission(2)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "TODO完了時点の次の AM5:00 に解除される。";
          case "en":
            return "next am 5:00";
          default:
            return "TODO完了時点の次の AM5:00 に解除される。";
        }
      },
      func: dailyLogic,
    },
    category: "daily_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "デイリーミッション3";
        case "en":
          return "daily mission3";
        default:
          return "デイリーミッション3";
      }
    },
  },
  /**
   * 4つ目のデイリーミッション
   */
  mission4: {
    description: "daily mission(4)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "TODO完了時点の次の AM5:00 に解除される。";
          case "en":
            return "next am 5:00";
          default:
            return "TODO完了時点の次の AM5:00 に解除される。";
        }
      },
      func: dailyLogic,
    },
    category: "daily_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "デイリーミッション4";
        case "en":
          return "daily mission4";
        default:
          return "デイリーミッション4";
      }
    },
  },
  weekly_boss1: {
    description: "weekly boss (1)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "毎週月曜日 AM5:00 に解除される。";
          case "en":
            return "reset at AM 5:00 on every monday";
          default:
            return "毎週月曜日 AM5:00 に解除される。";
        }
      },
      func: weeklyLogic,
    },
    category: "weekly_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "週次ボス(1)";
        case "en":
          return "weekly boss(1)";
        default:
          return "週次ボス(1)";
      }
    },
  },
  weekly_boss2: {
    description: "weekly boss (2)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "毎週月曜日 AM5:00 に解除される。";
          case "en":
            return "reset at AM 5:00 on every monday";
          default:
            return "毎週月曜日 AM5:00 に解除される。";
        }
      },
      func: weeklyLogic,
    },
    category: "weekly_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "週次ボス(2)";
        case "en":
          return "weekly boss(2)";
        default:
          return "週次ボス(2)";
      }
    },
  },
  weekly_boss3: {
    description: "weekly boss (3)",
    logic: {
      descriptipon: (lang) => {
        switch (lang) {
          case "ja":
            return "毎週月曜日 AM5:00 に解除される。";
          case "en":
            return "reset at AM 5:00 on every monday";
          default:
            return "毎週月曜日 AM5:00 に解除される。";
        }
      },
      func: weeklyLogic,
    },
    category: "weekly_mission",
    name: (lang) => {
      switch (lang) {
        case "ja":
          return "週次ボス(3)";
        case "en":
          return "weekly boss(3)";
        default:
          return "週次ボス(3)";
      }
    },
  },
};
