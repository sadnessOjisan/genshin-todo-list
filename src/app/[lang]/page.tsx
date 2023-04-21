import { type FC } from "react";
import { LangSelect } from "../../client/lang-select";
import { Todos } from "../../client/todos";
import { type Lang } from "../../type/lang";

interface RoutePath {
  lang: Lang;
}

type Props = {
  params: RoutePath;
};

const Page: FC<Props> = (props) => {
  return (
    <html lang={props.params.lang}>
      <body>
        <div>
          <LangSelect default={props.params.lang} />
          <Todos lang={props.params.lang} />
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

export async function generateStaticParams(): Promise<RoutePath[]> {
  return (["ja", "en"] as const).map((lang) => ({ lang }));
}

export default Page;
