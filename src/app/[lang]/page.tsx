import { type FC } from "react";
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
    <div>
      <Todos lang={props.params.lang} />
    </div>
  );
};

export async function generateStaticParams(): Promise<RoutePath[]> {
  return (["ja", "en"] as const).map((lang) => ({ lang }));
}

export default Page;
