import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const rootNavigationStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export const leftTabsStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: Spacing.md,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: Spacing.md,
    gap: Spacing.md,
  },
  labelContainer: {
    flex: 1,
  },
});

export const bottomTabsStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.md,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing.md,
    padding: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
});
