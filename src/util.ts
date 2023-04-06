export function getLanguageFromURL(pathname: string): string {
  const langCodeMatch = pathname.match(/\/([a-z]{2})/);
  if (langCodeMatch === null) {
    return "ja";
  }

  return langCodeMatch[1] || "ja";
}
