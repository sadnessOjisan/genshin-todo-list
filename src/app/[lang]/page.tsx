import { FC } from "react";

interface RoutePath {
  lang: "ja" | "en";
}

type Props = {
  params: RoutePath;
};

const Page: FC<Props> = (props) => {
  return (
    <div>
      <h1>hello world</h1>
      <div>lang: {JSON.stringify(props.params.lang)}</div>
    </div>
  );
};

export async function generateStaticParams(): Promise<RoutePath[]> {
  return (["ja", "en"] as const).map((lang) => ({ lang }));
}

export default Page;
