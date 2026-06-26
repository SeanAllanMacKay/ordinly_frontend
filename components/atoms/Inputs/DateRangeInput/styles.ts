import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const dateRangeInputStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  input: {
    flex: 1,
  },
});
