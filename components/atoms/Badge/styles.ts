import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const badgeStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  badgeContainer: {
    position: "absolute",
    top: -Spacing.sm,
    right: -Spacing.sm,
  },
});
