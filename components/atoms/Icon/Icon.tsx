import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontSizes } from "@/styles/FontSizes";
import { IconMappingType, IconProps } from "./types";
import { useTheme } from "react-native-paper";

const iconMapping: IconMappingType = {
  eye: "visibility",
  "eye-slash": "visibility-off",
  plus: "add",
  companies: "apartment",
  edit: "edit",
  "chevron-left": "chevron-left",
  "chevron-right": "chevron-right",
  close: "close",
  "menu-down": "arrow-drop-down",
  "menu-up": "arrow-drop-up",
  projects: "account-tree",
  gear: "settings",
  "chart-bar-horizontal": "pie-chart",
  home: "home",
  "user-circle": "account-circle",
  "identification-card": "contacts",
  blueprint: "schema",
  account: "manage-accounts",
  "squares-four": "apps",
  tasks: "check-box",
  remove: "delete",
} as const;

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
