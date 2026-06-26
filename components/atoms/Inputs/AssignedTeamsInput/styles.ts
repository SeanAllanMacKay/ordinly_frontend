import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const assignedTeamsInputStyles = StyleSheet.create({
  field: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  rowText: {
    flex: 1,
    gap: Spacing.sm,
  },
});
