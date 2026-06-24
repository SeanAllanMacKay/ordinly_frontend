import { useContext } from "react";
import { Pressable } from "react-native";
import { DatePickerContext } from "../DatePickerContext";
import React from "react";
import { Text } from "@/components/atoms/Text";
import { getMidPointOfMonth, getWeeksOfMonth } from "../util";
import { isBefore, startOfMonth, subMonths } from "date-fns";
import { Button } from "@/components/atoms/Button";

export const PreviousMonthButton = () => {
  const { activeMonth, setActiveMonth, min, midpoint } =
    useContext(DatePickerContext);

  const isDisabled = min && isBefore(startOfMonth(midpoint), min);

  const onPressPreviousMonth = () => {
    const midPoint = getMidPointOfMonth(activeMonth);

    setActiveMonth(getWeeksOfMonth(subMonths(midPoint, 1)));
  };

  return (
    <Button
      icon="chevron-left"
      onPress={onPressPreviousMonth}
      isDisabled={isDisabled}
    />
  );
};
