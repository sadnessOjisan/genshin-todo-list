import {
  isBefore as isBeforeOrig,
  set as setOrig,
  add as addOrig,
  nextMonday as nextMondayOrig,
  isMonday as isMondayOrig,
} from "date-fns";

export const isBefore = (target: Date, dateToCompare: Date) => {
  return isBeforeOrig(target, dateToCompare);
};

export const isAfter = (target: Date, dateToCompare: Date) => {
  return !isBefore(target, dateToCompare);
};

export const set = (
  target: Date,
  setDate: {
    year?: number;
    month?: number;
    date?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  }
) => {
  return setOrig(target, setDate);
};

export const add = (
  target: Date,
  addDate: {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }
) => {
  return addOrig(target, addDate);
};

export const nextMonday = (target: Date) => {
  return nextMondayOrig(target);
};

export const isMonday = (target: Date) => {
  return isMondayOrig(target);
};
