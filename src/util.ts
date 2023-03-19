export function getLanguageFromURL(pathname: string): string {
  const langCodeMatch = pathname.match(/\/([a-z]{2})/);
  return langCodeMatch ? langCodeMatch[1] : "en";
}
