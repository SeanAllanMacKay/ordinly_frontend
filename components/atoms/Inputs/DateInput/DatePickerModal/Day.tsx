import { format, isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";
import React, { useContext } from "react";
import { View, Pressable } from "react-native";
import { DatePickerContext } from "./DatePickerContext";
import { Typography } from "../../../Typography";
import { dayStyles } from "../styles";
import { useTheme } from "react-native-paper";

export const Day = ({ date }: { date: Date }) => {
  const theme = useTheme();
  const { midpoint, onChange, min, max, value } = useContext(DatePickerContext);

  const isToday = isSameDay(date, new Date());
  const isSelected = value && isSameDay(date, value);

  const isDisabled =
    (min && isBefore(date, min)) || (max && isAfter(date, max));

  const onPress = () => {
    onChange(date);
  };

  return (
    <View style={dayStyles.container}>
      {isSameMonth(date, midpoint) ? (
        <Pressable
          onPress={onPress}
          disabled={isDisabled}
          style={dayStyles.pressable}
        >
          <View
            style={[
              dayStyles.pressable,
              isToday && {
                ...dayStyles.today,
                borderColor: theme.colors.secondary,
              },
              isSelected && { backgroundColor: theme.colors.primary },
            ]}
          >
            <Typography
              color={
                isSelected
                  ? "onPrimary"
                  : isDisabled
                    ? "onSurfaceDisabled"
                    : undefined
              }
            >
              {format(date, "d")}
            </Typography>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};
