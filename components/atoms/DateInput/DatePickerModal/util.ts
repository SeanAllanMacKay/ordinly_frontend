import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
} from "date-fns";

export const getMidPointOfMonth = (currentMonth: Date[][]) => {
  return currentMonth[Math.ceil(currentMonth.length / 2)][0];
};

export const getWeeksOfMonth = (date: Date) => {
  const firstDaysOfWeeksInMonth = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  return firstDaysOfWeeksInMonth.map((firstDayOfWeek) =>
    eachDayOfInterval({
      start: firstDayOfWeek,
      end: endOfWeek(firstDayOfWeek),
    }),
  );
};
