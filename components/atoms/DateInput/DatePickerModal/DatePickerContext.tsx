import { isValid } from "date-fns";
import React, { createContext, useMemo, useState } from "react";
import { getMidPointOfMonth, getWeeksOfMonth } from "./util";
import { DateInputContextValueType, DatePickerProviderProps } from "../types";

const TODAY = new Date();
const DEFAULT_ACTIVE_MONTH = getWeeksOfMonth(TODAY);

export const DatePickerContext = createContext<DateInputContextValueType>({
  value: TODAY,
  defaultDate: TODAY,
  activeMonth: DEFAULT_ACTIVE_MONTH,
  setActiveMonth: (_newMonth: Date[][]) => {},
  midpoint: getMidPointOfMonth(DEFAULT_ACTIVE_MONTH),
  onChange: (_newDate: Date | undefined) => {},
  min: undefined,
  max: undefined,
});

export const DatePickerProvider = ({
  value,
  onChange,
  min,
  max,
  children,
}: DatePickerProviderProps) => {
  const defaultDate = useMemo(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (isValid(parsedDate)) {
        return parsedDate;
      }
    }

    return TODAY;
  }, []);

  const [activeMonth, setActiveMonth] = useState<Date[][]>(
    getWeeksOfMonth(defaultDate),
  );

  const midpoint = getMidPointOfMonth(activeMonth);

  return (
    <DatePickerContext.Provider
      value={{
        defaultDate,
        activeMonth,
        setActiveMonth,
        midpoint,
        onChange,
        min,
        max,
        value,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};
