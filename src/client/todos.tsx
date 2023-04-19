"use client";

import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import { TODO_DATA, TODO_KEYS, type TODO_KEY } from "../data/todo-data";
import { myStorage } from "../repository/local-storage";
import type { Lang } from "../type/lang";
import { isTodo } from "../util/assert";
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
    weekly_boss1: null,
    weekly_boss2: null,
    weekly_boss3: null,
  });
  useEffect(() => {
    const date1 = myStorage.get("mission1");
    const date2 = myStorage.get("mission2");
    const date3 = myStorage.get("mission3");
    const date4 = myStorage.get("mission4");
    const weeklyBoss1ExpiredDate = myStorage.get("weekly_boss1");
    const weeklyBoss2ExpiredDate = myStorage.get("weekly_boss2");
    const weeklyBoss3ExpiredDate = myStorage.get("weekly_boss3");

    setState({
      mission1: date1,
      mission2: date2,
      mission3: date3,
      mission4: date4,
      weekly_boss1: weeklyBoss1ExpiredDate,
      weekly_boss2: weeklyBoss2ExpiredDate,
      weekly_boss3: weeklyBoss3ExpiredDate,
    });
  }, []);

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;
    if (!isTodo(value)) {
      throw new Error("input value is not valid.");
    }

    const now = new Date().toISOString();
    if (checked) {
      myStorage.save(value, now);
      setState({ ...state, [value]: now });
    } else {
      myStorage.delete(value);
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

  const weekly = useMemo(() => {
    return strictEntries(TODO_DATA)
      .filter((v) => v[1].category === "weekly_mission")
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
      <h2>weekly</h2>
      <ul>
        {weekly.map((d) => (
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
