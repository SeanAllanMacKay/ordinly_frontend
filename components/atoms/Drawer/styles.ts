import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const drawerStyles = StyleSheet.create({
  position: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    minWidth: 300,
    maxWidth: 500,
    borderTopLeftRadius: Spacing.lg,
    borderBottomLeftRadius: Spacing.lg,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: Spacing.md,
    paddingTop: Spacing.md,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: Spacing.md,
    justifyContent: "flex-end",
    gap: Spacing.md,
    flexWrap: "wrap",
  },
});
