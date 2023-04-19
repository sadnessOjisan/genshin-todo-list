"use client";

import { useRouter } from "next/navigation";
import { type FC } from "react";
import { type Lang } from "../type/lang";

export const LangSelect: FC<{ default: Lang }> = (props) => {
  const router = useRouter();
  return (
    <select
      defaultValue={props.default}
      onChange={(e) => {
        const value = e.target.value;
        router.push(`/${value}`);
      }}
    >
      <option>ja</option>
      <option>en</option>
    </select>
  );
};
