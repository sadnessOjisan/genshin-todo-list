import { type FC } from "react";
import { LangSelect } from "../client/lang-select";
import { Todos } from "../client/todos";
import { DEFAULT_LANG } from "../const/lang";
import { VOCABULARY } from "../data/i18n";

const Page: FC = () => {
  return (
    <html lang={DEFAULT_LANG}>
      <body>
        <div>
          <LangSelect default={DEFAULT_LANG} />
          <h1>{VOCABULARY[DEFAULT_LANG].PAGE_TITLE}</h1>
          <Todos lang="ja" />
        </div>
        <div>
          <a href="https://github.com/sadnessOjisan/genshin-todo-list">
            source
          </a>
        </div>
      </body>
    </html>
  );
};

export default Page;
