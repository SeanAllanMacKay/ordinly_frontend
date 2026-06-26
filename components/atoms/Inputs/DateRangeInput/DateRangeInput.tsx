import React from "react";
import { View } from "react-native";

import { DateInput } from "../DateInput";
import { DateRangeInputProps, DateRangeValue } from "./types";
import { dateRangeInputStyles } from "./styles";

export const DateRangeInput = ({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  isLoading = false,
  index = 0,
  min,
  max,
  startLabel,
  endLabel,
}: DateRangeInputProps) => {
  const range: DateRangeValue = value ?? {};

  const handleStart = (start: Date | undefined) =>
    onChange({ ...range, start });

  const handleEnd = (end: Date | undefined) => onChange({ ...range, end });

  return (
    <View style={dateRangeInputStyles.row}>
      <View style={dateRangeInputStyles.input}>
        <DateInput
          value={range.start}
          onChange={handleStart}
          onBlur={onBlur}
          isError={isError}
          isDisabled={isDisabled}
          isLoading={isLoading}
          index={index}
          label={startLabel}
          min={min}
          max={range.end ?? max}
        />
      </View>

      <View style={dateRangeInputStyles.input}>
        <DateInput
          value={range.end}
          onChange={handleEnd}
          onBlur={onBlur}
          isError={isError}
          isDisabled={isDisabled}
          isLoading={isLoading}
          index={index}
          label={endLabel}
          min={range.start ?? min}
          max={max}
        />
      </View>
    </View>
  );
};
