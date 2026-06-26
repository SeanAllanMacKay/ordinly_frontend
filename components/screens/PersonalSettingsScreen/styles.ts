import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const personalSettingsScreenStyles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.md,
    display: "flex",
    gap: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.md,
  },
  settingsZone: {
    display: "flex",
    gap: Spacing.md,
  },
  settingRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 600,
  },
  stubField: {
    display: "flex",
    gap: Spacing.sm,
    flexShrink: 1,
  },
  dangerZone: {
    display: "flex",
    gap: Spacing.md,
    alignItems: "stretch",
  },
  dangerRow: {
    display: "flex",
    gap: Spacing.md,
    alignItems: "flex-start",
    maxWidth: 600,
  },
});
