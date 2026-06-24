import { StyleSheet } from "react-native";
import { Spacing } from "@/styles";

export const phoneNumberInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  selector: {
    width: 120,
  },
  number: {
    flex: 1,
  },
});
