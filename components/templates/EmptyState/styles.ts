import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const emptyStateStyles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    gap: Spacing.md,
  },
  iconContainer: {
    borderRadius: 100,
    padding: Spacing.md,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.xs,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
});
