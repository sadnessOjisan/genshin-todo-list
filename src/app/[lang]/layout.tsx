import { LangSelect } from "../../client/lang-select";
import { VOCABULARY } from "../../data/i18n";
import type { Lang } from "../../type/lang";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  return (
    <html lang={params.lang}>
      <head>
        <title>{VOCABULARY[params.lang].PAGE_TITLE}</title>
      </head>
      <body>
        <LangSelect default={params.lang} />
        <h1>{VOCABULARY[params.lang].PAGE_TITLE}</h1>
        {children}
      </body>
    </html>
  );
}
