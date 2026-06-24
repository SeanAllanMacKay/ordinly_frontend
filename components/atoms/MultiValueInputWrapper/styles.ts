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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  errorContainer: {
    marginLeft: Spacing.xs,
  },
});
