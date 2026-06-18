import { StyleSheet } from "react-native";

export const mapStyles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
  },
  map: { flex: 1 },
  markerContainer: {
    height: 10,
    width: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "red",
  },
  markerCircle: {
    height: 10,
    width: 10,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
