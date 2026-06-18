import { Platform, useWindowDimensions } from "react-native";

/**
 * Determines if the current width of the viewport is smaller than a given threshold
 *
 * @param size - The threshold
 * @returns Whether the width of the viewport is below the threshold
 */
export const useWidth = (size: number) => {
  const { width } = useWindowDimensions();

  return width >= size;
};
