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
