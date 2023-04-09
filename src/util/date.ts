export const getDateFromLocalStorage = (
  storage: Storage,
  key: string
): Date | null => {
  const value = storage.getItem(key);
  if (value === null) return null;
  return new Date(value);
};
export const formatDate = (date: Date): string => {
  return `${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
