import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const textInputFieldArrayStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.md,
  },
});

export const addressInputStyles = StyleSheet.create({
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
});
