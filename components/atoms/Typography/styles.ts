import { FontSizes } from "@/styles/FontSizes";
import { StyleSheet } from "react-native";

export const typographyStyles = StyleSheet.create({
  // font sizes
  xs: {
    fontSize: FontSizes.xs,
  },
  sm: {
    fontSize: FontSizes.sm,
  },
  md: {
    fontSize: FontSizes.md,
  },
  lg: {
    fontSize: FontSizes.lg,
  },
  xl: {
    fontSize: FontSizes.xl,
  },
  xxl: {
    fontSize: FontSizes.xxl,
  },
  xxxl: {
    fontSize: FontSizes.xxxl,
  },

  // emphasis
  high: {
    fontWeight: "600",
  },
  medium: {
    fontWeight: "400",
  },
  low: {
    fontWeight: "300",
  },
});
