import type { Lang } from "./type/lang";
import { isValidLang } from "./util/lang";

export function getLanguageFromURL(pathname: string): Lang {
  const langCodeMatch = pathname.match(/\/([a-z]{2})/);
  if (langCodeMatch === null) {
    return "ja";
  }
  const path = langCodeMatch[1];
  if (isValidLang(path)) {
    return path;
  }
  return "ja";
}
