import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  position: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  container: { minWidth: 300, maxWidth: 600 },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
  },
  contentContainer: { padding: 16 },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: Spacing.md,
    justifyContent: "flex-end",
    gap: Spacing.md,
    flexWrap: "wrap",
  },
});
