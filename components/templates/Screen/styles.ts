import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const screenStyles = StyleSheet.create({
  container: {
    padding: Spacing.sm,
    flex: 1,
    position: "relative",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex: 1,
  },
});
