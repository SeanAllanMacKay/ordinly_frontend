import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const accordionStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const accordionItemStyles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  itemContainer: {
    overflow: "hidden",
  },
  firstItem: {
    borderTopLeftRadius: Spacing.sm,
    borderTopRightRadius: Spacing.sm,
    borderBottomWidth: 1,
  },
  firstItemOpen: { borderBottomWidth: 0, marginBottom: Spacing.sm },
  middleItem: { borderBottomWidth: 1 },
  middleItemOpen: { borderBottomWidth: 0, marginVertical: Spacing.sm },
  lastItem: {
    borderBottomLeftRadius: Spacing.sm,
    borderBottomRightRadius: Spacing.sm,
    borderTopWidth: 0,
  },
  lastItemOpen: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    width: "100%",
    alignItems: "center",
  },

  topMargin: {
    marginTop: Spacing.sm,
  },
  bottomMargin: {
    marginBottom: Spacing.sm,
  },
  topBorder: {
    borderTopWidth: 1,
  },
  bottomBorder: { borderBottomWidth: 1 },
  contentContainer: {
    overflow: "hidden",
    position: "relative",
  },
});
