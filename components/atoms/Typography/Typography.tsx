import React from "react";
import Animated from "react-native-reanimated";

import { TypographyProps } from "./types";
import { typographyStyles } from "./styles";
import { useTheme } from "react-native-paper";

export const Typography = ({
  size = "md",
  emphasis = "medium",
  children,
  color = "onSurface",
  colorOverride,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Animated.Text
      style={[
        typographyStyles[size],
        typographyStyles[emphasis],
        { color: colorOverride ?? theme.colors[color] },
      ]}
    >
      {children}
    </Animated.Text>
  );
};
