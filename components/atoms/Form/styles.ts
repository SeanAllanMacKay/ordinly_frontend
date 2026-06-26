import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const formFieldStyles = StyleSheet.create({
  container: { marginBottom: Spacing.md, gap: Spacing.sm },
  errorContainer: {
    marginLeft: Spacing.xs,
  },
  horizontalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  horizontalLabel: {
    flexShrink: 0,
    width: "35%",
  },
  horizontalInput: {
    flex: 1,
  },
});

export const formFieldArrayStyles = StyleSheet.create({
  container: { marginBottom: Spacing.sm },
  errorContainer: {
    marginLeft: Spacing.xs,
    marginTop: Spacing.xs,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
