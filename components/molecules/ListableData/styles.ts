import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const listableDataStyles = StyleSheet.create({
  toggleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const loadingStateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
});
