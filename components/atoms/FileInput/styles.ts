import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const fileInputStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: Spacing.md,
    borderWidth: 1,
    borderStyle: "dashed",
    display: "flex",
    flexDirection: "column",
    gap: Spacing.sm,
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  filesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.sm,
    width: "100%",
  },
  file: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  multiple: {
    borderBottomWidth: 1,
  },
});
