import { StyleSheet } from "react-native";

export const avatarStackStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    alignItems: "center",
    justifyContent: "center",
  },
});

/** Fraction of an avatar's width that each subsequent avatar overlaps by. */
export const AVATAR_STACK_OVERLAP_RATIO = 0.35;

/** Width of the surface-coloured ring drawn around each stacked avatar. */
export const AVATAR_STACK_RING_WIDTH = 2;
