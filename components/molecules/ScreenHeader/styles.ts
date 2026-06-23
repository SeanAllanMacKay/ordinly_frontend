import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

// Width the floating mobile EntitySwitcher occupies on the right edge: the 40px
// avatar, its Spacing.md offset from the edge, plus a gap before header actions.
export const ENTITY_SWITCHER_RESERVED_WIDTH = 40 + Spacing.md + Spacing.sm;

export const screenHeaderStyle = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: Spacing.md,
    paddingVertical: Spacing.md,
  },
  withoutBackButton: {
    paddingHorizontal: Spacing.md,
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
