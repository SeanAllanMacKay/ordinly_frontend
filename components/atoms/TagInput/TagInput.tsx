import React, { useState } from "react";
import { TagInputProps } from "./types";
import { Menu, useTheme } from "react-native-paper";
import { Tag } from "../Tag";
import { Spacing } from "@/styles";

export const TagInput = ({
  options,
  label,
  value,
  onChange,
  icon,
}: TagInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <Menu
      visible={isOpen}
      onDismiss={() => setIsOpen(false)}
      anchor={
        <Tag
          text={value ? value?.label : label}
          color={value?.color}
          onPress={() => setIsOpen(true)}
          icon={icon}
        />
      }
      anchorPosition="bottom"
      contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
      style={{ marginTop: Spacing.sm }}
    >
      {options?.map(({ label, ...restProjectPriority }) => (
        <Menu.Item
          title={label}
          onPress={() => {
            onChange({ label, ...restProjectPriority });
            setIsOpen(false);
          }}
        />
      ))}
    </Menu>
  );
};
