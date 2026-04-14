import { ContentColorProp, EmphasisProp, SizeProp } from "@/styles/types";
import { ComponentProps, PropsWithChildren } from "react";
import Animated from "react-native-reanimated";

export type TypographyProps = PropsWithChildren<{
  size?: SizeProp;
  emphasis?: EmphasisProp;
  color?: ContentColorProp;
  colorOverride?: string;
  animationProps?: ComponentProps<typeof Animated.Text>;
}>;
