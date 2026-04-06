import { PHONE_WIDTH } from "@/constants/breakpoints";
import { useWidth } from "./useWidth";
import { Platform } from "react-native";

export const useIsPhone = () => {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return true;
  }

  return !useWidth(PHONE_WIDTH);
};
