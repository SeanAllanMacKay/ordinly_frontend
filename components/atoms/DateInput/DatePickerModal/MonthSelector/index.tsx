import React from "react";
import { View } from "react-native";
import { PreviousMonthButton } from "./PreviousMonthButton";
import { NextMonthButton } from "./NextMonthButton";
import { YearSelector } from "./YearSelector";
import { monthSelectorStyles } from "../../styles";

export const MonthSelector = () => {
  return (
    <View style={monthSelectorStyles.container}>
      <YearSelector />

      <View style={monthSelectorStyles.actionsContainer}>
        <PreviousMonthButton />
        <NextMonthButton />
      </View>
    </View>
  );
};
