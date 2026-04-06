import React, { useMemo, useState } from "react";
import { TextInput } from "../TextInput";

import { Menu, useTheme } from "react-native-paper";
import { SelectProps } from "./types";
import { Pressable } from "react-native";

export const Select = <ValueType,>({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  options,
  label,
  isLoading = false,
  index = 0,
}: SelectProps<ValueType>) => {
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  const displayValue = useMemo(
    () =>
      value
        ? (options.find(({ value: optionValue }) => value === optionValue)
            ?.label ?? "")
        : "",
    [options, value],
  );

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    onBlur();
    setOpen(false);
  };

  const onChangeValue = (newValue: ValueType) => {
    onChange(newValue);
    onClose();
  };

  return (
    <Menu
      key={isOpen ? "open" : "closed"}
      visible={isOpen}
      onDismiss={onClose}
      anchor={
        isLoading ? (
          <TextInput isLoading={true} index={index} isEditable={false} />
        ) : (
          <Pressable onPress={onOpen}>
            <TextInput
              value={displayValue}
              isError={isError}
              label={label}
              isEditable={false}
              isDisabled={isDisabled}
              onPress={onOpen}
            />
          </Pressable>
        )
      }
      anchorPosition="bottom"
      contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
    >
      {options?.map(({ label, value }) => (
        <Menu.Item
          title={label}
          onPress={() => onChangeValue(value)}
          key={typeof value === "string" ? value : JSON.stringify(value)}
        />
      ))}
    </Menu>
  );
};
