import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: Spacing.md,
  },
  headerContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  contentContainer: { padding: Spacing.md },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingRight: Spacing.md,
    paddingLeft: Spacing.md,
    paddingBottom: Spacing.md,
    justifyContent: "flex-end",
    gap: Spacing.md,
    flexWrap: "wrap",
  },
  headerContentContainer: {
    flex: 1,
  },
});
