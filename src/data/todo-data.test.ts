import { describe, it, expect } from "vitest";
import { FreeCheckLogic } from "./todo-data";

// The two tests marked with concurrent will be run in parallel
describe("todo-data", () => {
  describe("dailyLogic", () => {
    it("", () => {
      const lastUpdated = new Date("2023-04-20T03:23:00+09:00");
      const now = new Date("2023-04-20T06:23:00+09:00");
      const actual = FreeCheckLogic.canFreeDailyTodo(lastUpdated, now);
      expect(actual).toBe(true);
    });
    it("", () => {
      const lastUpdated = new Date("2023-04-20T03:23:00+09:00");
      const now = new Date("2023-04-20T04:59:59+09:00");
      const actual = FreeCheckLogic.canFreeDailyTodo(lastUpdated, now);
      expect(actual).toBe(false);
    });
    it("", () => {
      const lastUpdated = new Date("2023-04-20T23:23:00+09:00");
      const now = new Date("2023-04-21T06:23:00+09:00");
      const actual = FreeCheckLogic.canFreeDailyTodo(lastUpdated, now);
      expect(actual).toBe(true);
    });
    it("", () => {
      const lastUpdated = new Date("2023-04-20T23:23:00+09:00");
      const now = new Date("2023-04-21T04:59:59+09:00");
      const actual = FreeCheckLogic.canFreeDailyTodo(lastUpdated, now);
      expect(actual).toBe(false);
    });
  });

  describe("weekly todo free logic", () => {
    it("", () => {
      const lastUpdated = new Date("2023-04-24T04:23:00+09:00");
      const now = new Date("2023-04-24T05:00:01+09:00");
      const actual = FreeCheckLogic.canFreeWeeklyTodo(lastUpdated, now);
      expect(actual).toBe(true);
    });
    it("", () => {
      const lastUpdated = new Date("2023-04-20T23:23:00+09:00");
      const now = new Date("2023-04-24T05:00:01+09:00");
      const actual = FreeCheckLogic.canFreeWeeklyTodo(lastUpdated, now);
      expect(actual).toBe(true);
    });
    it("", () => {
      const lastUpdated = new Date("2023-04-20T23:23:00+09:00");
      const now = new Date("2023-04-24T04:59:59+09:00");
      const actual = FreeCheckLogic.canFreeWeeklyTodo(lastUpdated, now);
      expect(actual).toBe(false);
    });
    it("", () => {
      const lastUpdated = new Date("2023-04-20T23:23:00+09:00");
      const now = new Date("2023-04-21T04:59:59+09:00");
      const actual = FreeCheckLogic.canFreeWeeklyTodo(lastUpdated, now);
      expect(actual).toBe(false);
    });
  });
});
