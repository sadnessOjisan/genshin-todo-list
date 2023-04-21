"use client";

import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import {
  type CATEGORY_KEY,
  TODO_DATA,
  type TODO_KEY,
  categories,
} from "../data/todo-data";
import { LocalStorabeWrapper } from "../repository/local-storage";
import {
  type ExpireDateState,
  getAllTodosExpireDates,
  updateAllTodosExpire,
} from "../service/check-expire";
import type { Lang } from "../type/lang";
import { isTodo } from "../util/assert";
import { strictEntries } from "../util/object";
import { Time } from "./time";

interface Props {
  lang: Lang;
}

type EachCategoryTodos = {
  category: CATEGORY_KEY;
  categoryName: string;
  categoryLogicDescriptioin: string;
  todos: ReadonlyArray<{
    key: TODO_KEY;
    value: string;
    logic: string;
    time: Date | null;
    initialCheck: boolean;
  }>;
};

const getTodoByCategoryKey = (
  key: CATEGORY_KEY,
  state: ExpireDateState,
  lang: Lang
): EachCategoryTodos => {
  const todos = strictEntries(TODO_DATA)
    .filter((v) => v[1].category.key === key)
    .map((v) => {
      const todoKey = v[0];
      const todo = v[1];
      const savedDate = state[todoKey];
      const shouldRelease = savedDate
        ? todo.category.logic.func(savedDate, new Date())
        : true;
      return {
        key: todoKey,
        value: todo.name(lang),
        logic: todo.category.logic.descriptipon(lang),
        time: savedDate,
        initialCheck: !shouldRelease,
      };
    });

  return {
    category: key,
    categoryName: categories[key].name(lang),
    categoryLogicDescriptioin: categories[key].logic.descriptipon(lang),
    todos,
  };
};

export const Todos: FC<Props> = ({ lang }) => {
  const [state, setState] = useState<ExpireDateState>({
    mission1: null,
    mission2: null,
    mission3: null,
    mission4: null,
    weekly_boss1: null,
    weekly_boss2: null,
    weekly_boss3: null,
    silk_flower: null,
    COR_LAPIS: null,
    DENDROBIUM: null,
    FLUORESCENT_FUNGUS: null,
    MOURNING_FLOWER: null,
    TRISHIRAITE: null,
  });
  useEffect(() => {
    const myStorage = new LocalStorabeWrapper(window.localStorage);
    const pastSavedState = getAllTodosExpireDates(myStorage);
    const updatedState = updateAllTodosExpire(pastSavedState, myStorage);
    setState({
      mission1: updatedState["mission1"],
      mission2: updatedState["mission2"],
      mission3: updatedState["mission3"],
      mission4: updatedState["mission4"],
      weekly_boss1: updatedState["weekly_boss1"],
      weekly_boss2: updatedState["weekly_boss2"],
      weekly_boss3: updatedState["weekly_boss3"],
      silk_flower: updatedState["silk_flower"],
      COR_LAPIS: updatedState["COR_LAPIS"],
      DENDROBIUM: updatedState["DENDROBIUM"],
      FLUORESCENT_FUNGUS: updatedState["FLUORESCENT_FUNGUS"],
      MOURNING_FLOWER: updatedState["MOURNING_FLOWER"],
      TRISHIRAITE: updatedState["TRISHIRAITE"],
    });
  }, []);

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const myStorage = new LocalStorabeWrapper(window.localStorage);
    const checked = e.target.checked;
    console.log("checked", checked);
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
    return getTodoByCategoryKey("daily_mission", state, lang);
  }, [lang, state]);

  const weekly = useMemo(() => {
    return getTodoByCategoryKey("weekly_mission", state, lang);
  }, [lang, state]);

  const specialities = useMemo(() => {
    return getTodoByCategoryKey("local_specialties", state, lang);
  }, [lang, state]);

  return (
    <div>
      <EachCategoryTodos todos={daily} handleOnChange={handleChangeCheckbox} />
      <EachCategoryTodos todos={weekly} handleOnChange={handleChangeCheckbox} />
      <EachCategoryTodos
        todos={specialities}
        handleOnChange={handleChangeCheckbox}
      />
    </div>
  );
};

const EachCategoryTodos: FC<{
  todos: EachCategoryTodos;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ todos, handleOnChange }) => (
  <div>
    <h2>{todos.categoryName}</h2>
    <p>{todos.categoryLogicDescriptioin}</p>
    <ul>
      {todos.todos.map((d) => {
        const { time } = d;
        return (
          <li>
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                id={d.key}
                onChange={handleOnChange}
                value={d.key}
                checked={d.initialCheck}
              />
              <label htmlFor={d.key}>
                <p>
                  {d.value}(at {time && <Time time={time} />})
                </p>
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);
