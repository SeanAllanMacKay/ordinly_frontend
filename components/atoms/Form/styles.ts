import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const formFieldStyles = StyleSheet.create({
  container: { marginBottom: Spacing.sm },
  errorContainer: {
    marginLeft: Spacing.xs,
    marginTop: Spacing.xs,
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
