"use client";

import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { TODO_DATA, TODO_KEY } from "../data/todo-data";
import type { Lang } from "../type/lang";
import { strictEntries } from "../util/object";

interface Props {
  lang: Lang;
}

export const Todos: FC<Props> = ({ lang }) => {
  const [state, setState] = useState<{
    [x in TODO_KEY]: string | null;
  }>({
    mission1: null,
    mission2: null,
    mission3: null,
    mission4: null,
  });
  useEffect(() => {
    const date1 = window.localStorage.getItem("mission1");
    const date2 = window.localStorage.getItem("mission2");
    const date3 = window.localStorage.getItem("mission3");
    const date4 = window.localStorage.getItem("mission4");

    setState({
      mission1: date1,
      mission2: date2,
      mission3: date3,
      mission4: date4,
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

  const daily = useMemo(() => {
    return strictEntries(TODO_DATA)
      .filter((v) => v[1].category === "daily_mission")
      .map((v) => ({
        key: v[0],
        value: v[1].name(lang),
        logic: v[1].logic.descriptipon(lang),
      }));
  }, [lang]);
  return (
    <div>
      {lang}
      <h2>daily</h2>
      {JSON.stringify(state)}
      <ul>
        {daily.map((d) => (
          <li>
            <input
              type="checkbox"
              id={d.key}
              onChange={handleChangeCheckbox}
              value={d.key}
            />
            <label htmlFor={d.key}>
              {d.value}({state[d.key]})
            </label>
            <span>{d.logic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
