import { useState } from "react";
import { Button } from "../Button";
import { MenuButtonProps } from "./types";
import { Menu, useTheme } from "react-native-paper";
import React from "react";
import { FontSizes, Spacing } from "@/styles";

export const MenuButton = ({
  label,
  icon,
  options,
  mode,
  isLoading,
  isDisabled,
  isSkeleton,
}: MenuButtonProps) => {
  const theme = useTheme();
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Menu
      key={isOpen ? "open" : "closed"}
      visible={isOpen}
      onDismiss={onClose}
      anchor={
        <Button
          label={label}
          icon={icon}
          onPress={onOpen}
          mode={mode}
          isLoading={isLoading}
          isDisabled={isDisabled}
          isSkeleton={isSkeleton}
        />
      }
      anchorPosition="bottom"
      contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
    >
      {options?.map(({ label, onPress, icon, size = "md", isActive }) => (
        <Menu.Item
          title={label}
          onPress={() => {
            onPress();
            onClose();
          }}
          leadingIcon={icon}
          titleStyle={{
            fontSize: FontSizes[size],
            lineHeight: FontSizes[size],
            color: isActive ? theme.colors.onPrimaryContainer : undefined,
          }}
          contentStyle={{
            height: 60,
          }}
          style={{
            backgroundColor: isActive
              ? theme.colors.primaryContainer
              : theme.colors.surfaceVariant,
            height: 60,
          }}
        />
      ))}
    </Menu>
  );
};
