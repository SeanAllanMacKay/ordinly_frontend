import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontSizes } from "@/styles/FontSizes";
import { IconProps } from "./types";
import { useTheme } from "react-native-paper";
import { iconMapping } from "./util";

export const Icon = ({
  name,
  size = "md",
  sizeOverride,
  color = "onBackground",
  colorOverride,
}: IconProps) => {
  const theme = useTheme();

  return iconMapping[name] ? (
    <MaterialIcons
      size={sizeOverride ?? FontSizes[size]}
      color={colorOverride ?? theme.colors[color]}
      name={iconMapping[name]}
    />
  ) : (
    <MaterialIcons
      size={sizeOverride ?? FontSizes[size]}
      color={colorOverride ?? theme.colors[color]}
      name="question-mark"
    />
  );
};
