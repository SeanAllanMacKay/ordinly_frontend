import { useContext } from "react";
import { Pressable } from "react-native";
import { DatePickerContext } from "../DatePickerContext";
import React from "react";
import { Text } from "../../../Text";
import { getMidPointOfMonth, getWeeksOfMonth } from "../util";
import { addMonths, isAfter, lastDayOfMonth } from "date-fns";
import { Button } from "../../../Button";

export const NextMonthButton = () => {
  const { activeMonth, setActiveMonth, midpoint, max } =
    useContext(DatePickerContext);

  const isDisabled = max && isAfter(lastDayOfMonth(midpoint), max);

  const onPressNextMonth = () => {
    const midPoint = getMidPointOfMonth(activeMonth);

    setActiveMonth(getWeeksOfMonth(addMonths(midPoint, 1)));
  };

  return (
    <Button
      icon="chevron-right"
      onPress={onPressNextMonth}
      isDisabled={isDisabled}
    />
  );
};
