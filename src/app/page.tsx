import { type FC } from "react";
import { Todos } from "../client/todos";

const Page: FC = () => {
  return (
    <div>
      <Todos lang="ja" />
    </div>
  );
};

export default Page;
