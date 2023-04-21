import { LangSelect } from "../../client/lang-select";
import { DEFAULT_LANG } from "../../const/lang";
import { VOCABULARY } from "../../data/i18n";
import type { Lang } from "../../type/lang";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  /**
   * @see https://beta.nextjs.org/docs/api-reference/file-conventions/layout#params-optional
   */
  params: { lang: Lang };
}) {
  return (
    <html lang={params?.lang}>
      <head>
        <title>{VOCABULARY[params.lang || DEFAULT_LANG].PAGE_TITLE}</title>
      </head>
      <body>
        <LangSelect default={params.lang || DEFAULT_LANG} />
        <h1>{VOCABULARY[params.lang || DEFAULT_LANG].PAGE_TITLE}</h1>
        {children}
      </body>
    </html>
  );
}
