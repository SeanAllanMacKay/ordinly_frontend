import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

export const documentsListStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemAbove: {
    paddingTop: Spacing.md,
  },
  itemUnder: {
    borderBottomWidth: 1,
  },
  info: { display: "flex", flexDirection: "column", flex: 1 },
});
