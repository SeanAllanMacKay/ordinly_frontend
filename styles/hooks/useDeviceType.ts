import { DESKTOP_WIDTH, TABLET_WIDTH } from "@/constants/breakpoints";
import { useWidth } from "./useWidth";

export const useIsPhone = () => {
  const atLeastTabletWidth = useWidth(TABLET_WIDTH - 1);

  return !atLeastTabletWidth;
};

export const useIsTablet = () => {
  const atLeastTabletWidth = useWidth(TABLET_WIDTH);
  const smallerThanDesktop = useWidth(DESKTOP_WIDTH);

  return atLeastTabletWidth && !smallerThanDesktop;
};

export const useIsDesktop = () => {
  const atLeastDesktopWidth = useWidth(DESKTOP_WIDTH);

  return atLeastDesktopWidth;
};
