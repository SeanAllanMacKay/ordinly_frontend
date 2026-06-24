import { FontSizes, Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const enrichedTextInputStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    position: "relative",
    minHeight: 110,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    overflow: "hidden",
  },
  input: {
    width: "100%",
    fontSize: FontSizes.md,
    padding: Spacing.md,
  },
  labelContainer: {
    position: "absolute",
    left: Spacing.sm,
    borderRadius: Spacing.md,
    paddingHorizontal: 6,
  },
});
