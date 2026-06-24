import { StyleSheet } from "react-native";
import { Spacing } from "@/styles";

export const multiSelectStyles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
});
