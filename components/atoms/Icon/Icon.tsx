import React from "react";

import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontSizes } from "@/styles/FontSizes";
import { IconProps } from "./types";
import { useTheme } from "react-native-paper";
import { iconMapping } from "./util";
import { getIconModeColors } from "./variants";
import { iconStyles } from "./styles";

export const Icon = ({
  name,
  size = "md",
  sizeOverride,
  color = "onBackground",
  colorOverride,
  mode = "text",
}: IconProps) => {
  const theme = useTheme();

  const glyphSize = sizeOverride ?? FontSizes[size];
  const iconName = iconMapping[name] ?? "question-mark";
  const { containerColor, iconColor, borderColor } = getIconModeColors(
    color,
    mode,
    theme.colors,
  );

  const glyph = (
    <MaterialIcons
      size={glyphSize}
      color={colorOverride ?? iconColor}
      name={iconName}
    />
  );

  if (mode === "text") {
    return glyph;
  }

  return (
    <View
      style={[
        iconStyles.container,
        {
          backgroundColor: containerColor,
          borderColor,
          borderWidth: borderColor ? 1 : 0,
        },
      ]}
    >
      {glyph}
    </View>
  );
};
