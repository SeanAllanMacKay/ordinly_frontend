import React, { useMemo, useState } from "react";
import { Pressable } from "react-native";

import { Menu, TextInput } from "react-native-paper";

type SelectProps = {
  value: string;
  onChange: (newValue: string | number) => void;
  onBlur: () => void;
  isError: boolean;
  isDisabled?: boolean;
  label?: string;
  options: Array<{ value: string | number; label: string }>;
};

export const Select = ({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  options,
  label,
}: SelectProps) => {
  const [isOpen, setOpen] = useState(false);

  const displayValue = useMemo(
    () =>
      value
        ? options.find(({ value: optionValue }) => value === optionValue)?.label
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

  const onChangeValue = (newValue: string | number) => {
    onChange(newValue);
    onClose();
  };

  return (
    <>
      <Menu
        visible={isOpen}
        onDismiss={onClose}
        anchor={
          <Pressable onPress={!isDisabled ? onOpen : undefined}>
            <TextInput
              value={displayValue}
              error={isError}
              label={label}
              mode={"outlined"}
            />
          </Pressable>
        }
        anchorPosition="bottom"
      >
        {options?.map(({ label, value }) => (
          <Menu.Item
            title={label}
            onPress={() => onChangeValue(value)}
            key={value}
          />
        ))}
      </Menu>
    </>
  );
};
