import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const accountDetailsCardStyles = StyleSheet.create({
  identityRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 600,
  },
  identityText: {
    flexShrink: 1,
    gap: Spacing.xs,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
});
