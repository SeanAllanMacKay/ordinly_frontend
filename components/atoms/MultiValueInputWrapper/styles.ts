import { StyleSheet } from "react-native";
import { Spacing } from "@/styles";

export const multiValueInputWrapperStyles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  itemsCompact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  itemsList: {
    flexDirection: "column",
    gap: Spacing.sm,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  inputField: {
    flex: 1,
  },
  errorContainer: {
    marginLeft: Spacing.xs,
  },
});
