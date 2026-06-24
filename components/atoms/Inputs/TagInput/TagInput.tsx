import React, { useState } from "react";
import { TagInputProps } from "./types";
import { Menu, useTheme } from "react-native-paper";
import { Tag } from "../../Tag";
import { Spacing } from "@/styles";

export const TagInput = ({
  options,
  label,
  value,
  onChange,
  onBlur,
  isDisabled,
  icon,
}: TagInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const selected = options?.find((option) => option.value === value);

  return (
    <Menu
      visible={isOpen}
      onDismiss={() => {
        setIsOpen(false);
        onBlur?.();
      }}
      anchor={
        <Tag
          text={selected?.label ?? label ?? ""}
          color={selected?.color}
          onPress={isDisabled ? undefined : () => setIsOpen(true)}
          icon={icon}
        />
      }
      anchorPosition="bottom"
      contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
      style={{ marginTop: Spacing.sm }}
    >
      {options?.map((option) => (
        <Menu.Item
          key={option.value}
          title={option.label}
          onPress={() => {
            onChange(option.value);
            setIsOpen(false);
            onBlur?.();
          }}
        />
      ))}
    </Menu>
  );
};
