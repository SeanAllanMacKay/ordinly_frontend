import React from "react";
import { View } from "react-native";
import { Day } from "./Day";
import { weekStyles } from "../styles";

export const Week = ({ days }: { days: Date[] }) => {
  return (
    <View style={weekStyles.container}>
      {days.map((day) => (
        <Day date={day} key={day.toString()} />
      ))}
    </View>
  );
};
