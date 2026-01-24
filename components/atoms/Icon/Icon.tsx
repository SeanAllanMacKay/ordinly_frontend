import React, { useMemo } from "react";

import { MaskSad, type IconWeight } from "@phosphor-icons/react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const sizes = {
  sm: 20,
  md: 24,
  lg: 40,
};

const iconMapping = {
  eye: () => <MaterialIcons name="visibility" />,
  "eye-slash": () => <MaterialIcons name="visibility-off" />,
  plus: () => <MaterialIcons name="add" />,
  "building-office": () => <MaterialIcons name="apartment" />,
  "pencil-outline": () => <MaterialIcons name="edit" />,
  "chevron-left": () => <MaterialIcons name="chevron-left" />,
  "chevron-right": () => <MaterialIcons name="chevron-right" />,
  close: () => <MaterialIcons name="close" />,
  "menu-down": () => <MaterialIcons name="arrow-drop-down" />,
  "menu-up": () => <MaterialIcons name="arrow-drop-up" />,
  projects: () => <MaterialIcons name="account-tree" />,
  gear: () => <MaterialIcons name="settings" />,
  "chart-bar-horizontal": () => <MaterialIcons name="pie-chart" />,
  "presentation-chart": () => <MaterialIcons name="insert-chart" />,
  "user-circle": () => <MaterialIcons name="account-circle" />,
  "identification-card": () => <MaterialIcons name="contacts" />,
  blueprint: () => <MaterialIcons name="schema" />,
  "user-circle-gear": () => <MaterialIcons name="manage-accounts" />,
  "squares-four": () => <MaterialIcons name="apps" />,
  tasks: () => <MaterialIcons name="check-box" />,
};

export type IconProps = {
  name: keyof typeof iconMapping;
  color?: string;
  size?: keyof typeof sizes;
  weight?: IconWeight;
};

export const Icon = ({
  name,
  size = "md",
  color = "#000000",
  ...restProps
}: IconProps) => {
  const Component = useMemo(() => iconMapping?.[name], [name]);

  return Component ? (
    <Component {...restProps} size={sizes[size]} color={color} />
  ) : (
    <MaskSad {...restProps} size={sizes[size]} color={color} />
  );
};
