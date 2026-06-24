import { StyleSheet } from "react-native";
import { Spacing } from "@/styles";

export const listItemsStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  trailing: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
