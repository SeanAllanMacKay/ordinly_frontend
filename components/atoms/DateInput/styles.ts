import { Spacing } from "@/styles";
import { StyleSheet } from "react-native";

const datePickerStyles = StyleSheet.create({});

export const weekStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export const yearSelectorStyles = StyleSheet.create({
  contentContainer: { borderRadius: Spacing.sm },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 200,
  },
  year: {
    width: "33%",
    alignItems: "center",
    padding: Spacing.sm,
    borderRadius: Spacing.sm,
  },
  todaysYear: {
    borderWidth: 2,
    borderColor: "rgb(0, 99, 152)",
  },
});

export const monthSelectorStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export const dayStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  pressable: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  today: {
    borderWidth: 2,
  },
});
