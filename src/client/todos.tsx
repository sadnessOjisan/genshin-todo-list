"use client";

import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import { TODO_DATA, type TODO_KEY } from "../data/todo-data";
import { LocalStorabeWrapper } from "../repository/local-storage";
import type { Lang } from "../type/lang";
import { isTodo } from "../util/assert";
import { strictEntries } from "../util/object";
import { Time } from "./time";

interface Props {
  lang: Lang;
}

export const Todos: FC<Props> = ({ lang }) => {
  const [state, setState] = useState<{
    [x in TODO_KEY]: Date | null;
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
    const myStorage = new LocalStorabeWrapper(window.localStorage);
    const date1 = myStorage.getSavedDate("mission1");
    const date2 = myStorage.getSavedDate("mission2");
    const date3 = myStorage.getSavedDate("mission3");
    const date4 = myStorage.getSavedDate("mission4");
    const weeklyBoss1ExpiredDate = myStorage.getSavedDate("weekly_boss1");
    const weeklyBoss2ExpiredDate = myStorage.getSavedDate("weekly_boss2");
    const weeklyBoss3ExpiredDate = myStorage.getSavedDate("weekly_boss3");

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
    const myStorage = new LocalStorabeWrapper(window.localStorage);
    const checked = e.target.checked;
    const value = e.target.value;
    if (!isTodo(value)) {
      throw new Error("input value is not valid.");
    }

    const now = new Date();
    if (checked) {
      myStorage.saveDate(value, now);
      setState({ ...state, [value]: now });
    } else {
      myStorage.delete(value);
      setState({ ...state, [value]: null });
    }
  };

  const daily = useMemo(() => {
    return strictEntries(TODO_DATA)
      .filter((v) => v[1].category === "daily_mission")
      .map((v) => {
        const todoKey = v[0];
        const savedDate = state[todoKey];
        return {
          key: todoKey,
          value: v[1].name(lang),
          logic: v[1].logic.descriptipon(lang),
          initialCheck: savedDate
            ? v[1].logic.func(savedDate, new Date())
            : false,
        };
      });
  }, [lang, state]);

  const weekly = useMemo(() => {
    return strictEntries(TODO_DATA)
      .filter((v) => v[1].category === "weekly_mission")
      .map((v) => {
        const todoKey = v[0];
        const savedDate = state[todoKey];
        return {
          key: v[0],
          value: v[1].name(lang),
          logic: v[1].logic.descriptipon(lang),
          initialCheck: savedDate
            ? v[1].logic.func(savedDate, new Date())
            : false,
        };
      });
  }, [lang, state]);

  return (
    <div>
      <h2>daily</h2>
      <ul>
        {daily.map((d) => {
          const time = state[d.key];
          return (
            <li>
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  id={d.key}
                  onChange={handleChangeCheckbox}
                  value={d.key}
                  defaultChecked={d.initialCheck}
                />
                <label htmlFor={d.key}>
                  <p>
                    {d.value}(at {time && <Time time={time} />})
                  </p>
                  <p>{d.logic}</p>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <h2>weekly</h2>
      <ul>
        {weekly.map((d) => {
          const time = state[d.key];
          return (
            <li>
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  id={d.key}
                  onChange={handleChangeCheckbox}
                  value={d.key}
                  defaultChecked={d.initialCheck}
                />
                <label htmlFor={d.key}>
                  <p>
                    {d.value}(at {time && <Time time={time} />})
                  </p>
                  <p>{d.logic}</p>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
