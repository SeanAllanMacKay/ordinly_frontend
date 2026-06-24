import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const locationInputStyles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  container: {
    minWidth: 300,
    maxWidth: 500,
    padding: Spacing.md,
  },
  suggestions: {
    gap: Spacing.sm,
    paddingTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  emptyStateIcon: {
    borderRadius: 100,
    padding: Spacing.md,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  suggestionItem: {
    padding: Spacing.sm,
  },
});
