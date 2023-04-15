import type { Lang } from "../type/lang";

export const isValidLang = (lang: unknown): lang is Lang => {
  return lang === "ja" || lang === "en";
};
