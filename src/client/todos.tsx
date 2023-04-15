"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import type { Lang } from "../type/lang";

interface Props {
  lang: Lang;
}

export const Todos: FC<Props> = ({ lang }) => {
  const [state, setState] = useState<{
    mission1: string | null;
    mission2: string | null;
  }>({
    mission1: null,
    mission2: null,
  });
  useEffect(() => {
    const date1 = window.localStorage.getItem("mission1");
    const date2 = window.localStorage.getItem("mission2");

    setState({
      mission1: date1,
      mission2: date2,
    });
  }, []);

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const now = new Date().toISOString();
    if (checked) {
      window.localStorage.setItem(value, now);
      setState({ ...state, [value]: now });
    } else {
      window.localStorage.removeItem(value);
      setState({ ...state, [value]: null });
    }
  };
  return (
    <div>
      {lang}
      <h2>daily</h2>
      {JSON.stringify(state)}
      <ul>
        <li>
          <input
            type="checkbox"
            id="mission1"
            onChange={handleChangeCheckbox}
            value="mission1"
          />
          <label htmlFor="mission1">mission 1({state.mission1})</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="mission2"
            onChange={handleChangeCheckbox}
            value="mission2"
          />
          <label htmlFor="mission2">mission 2({state.mission2})</label>
        </li>
      </ul>
    </div>
  );
};
