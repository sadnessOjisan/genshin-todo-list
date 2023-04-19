"use client";

import { type FC, useMemo } from "react";

export const Time: FC<{ time: Date }> = ({ time }) => {
  const timeStr = useMemo(() => {
    return time.toISOString();
  }, [time]);

  return <time dateTime={timeStr}>{timeStr}</time>;
};
