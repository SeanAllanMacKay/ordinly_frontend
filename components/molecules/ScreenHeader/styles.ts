import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const screenHeaderStyle = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  withoutBackButton: {
    paddingHorizontal: Spacing.md,
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
