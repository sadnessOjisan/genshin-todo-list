import { describe, it, expect } from "vitest";
import { add, isBefore, isMonday, nextMonday, set } from "./date";

// The two tests marked with concurrent will be run in parallel
describe("date util", () => {
  describe("isBefore", () => {
    it("1989 is not before of 1987", () => {
      const actual = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11));
      expect(actual).toBe(false);
    });
    it("1987 is  before of 1989", () => {
      const actual = isBefore(new Date(1987, 6, 10), new Date(1989, 1, 11));
      expect(actual).toBe(true);
    });
  });
  describe("add", () => {
    it("add 1 year to 1987", () => {
      const actual = add(new Date(1989, 6, 10), { years: 1 });
      expect(actual.toISOString()).toBe(new Date(1990, 6, 10).toISOString());
    });
  });
  describe("set", () => {
    it("set 2000 y", () => {
      const actual = set(new Date(1989, 6, 10), { year: 2000 });
      expect(actual.toISOString()).toBe(new Date(2000, 6, 10).toISOString());
    });
  });
  describe("nextMonday", () => {
    it("pass thirsday", () => {
      const expected = new Date("2023-04-24T06:23:00+09:00").toISOString();
      const target = new Date("2023-04-20T06:23:00+09:00"); // 木曜日
      const actual = nextMonday(target);
      expect(actual.toISOString()).toBe(expected);
    });
    it("pass monday", () => {
      const expected = new Date("2023-05-01T04:59:59+09:00").toISOString();
      const target = new Date("2023-04-24T04:59:59+09:00"); // 月曜日
      const actual = nextMonday(target);
      expect(actual.toISOString()).toBe(expected);
    });
  });
  describe("isMonday", () => {
    it("pass thirsday", () => {
      const target = new Date("2023-04-20T06:23:00+09:00"); // 木曜日
      const actual = isMonday(target);
      expect(actual).toBe(false);
    });
    it("pass monday", () => {
      const target = new Date("2023-04-24T04:59:59+09:00"); // 月曜日
      const actual = isMonday(target);
      expect(actual).toBe(true);
    });
  });
});
