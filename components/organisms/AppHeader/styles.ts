import { Colors } from "@/styles/Colors";
import { StyleSheet } from "react-native";

export const appHeaderStyles = StyleSheet.create({
  appHeader: {
    zIndex: 10,
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: Colors.light.primary,
  },
});
