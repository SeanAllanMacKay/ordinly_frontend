import React from "react";
import Animated, { LinearTransition } from "react-native-reanimated";

import { TypographyProps } from "./types";
import { typographyStyles } from "./styles";
import { useTheme } from "react-native-paper";

export const Typography = ({
  size = "md",
  emphasis = "medium",
  children,
  color = "onSurface",
  colorOverride,
  animationProps,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Animated.Text
      style={[
        ,
        typographyStyles[emphasis],
        {
          color: colorOverride ?? theme.colors[color],
          fontSize: typographyStyles[size].fontSize,
        },
      ]}
      {...animationProps}
      layout={LinearTransition}
    >
      {children}
    </Animated.Text>
  );
};
