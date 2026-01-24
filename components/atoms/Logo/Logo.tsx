import { useWidth } from "@/styles";
import { Text } from "@/components";
import { LARGE_BREAKPOINT } from "@/constants/breakpoints";

export const Logo = () => {
  const isLargeHorizontal = useWidth(LARGE_BREAKPOINT);

  return <Text>{/* Add Logo here */}</Text>;
};
