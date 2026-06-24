import React, { useState } from "react";
import { TextInput } from "../TextInput";

import { Menu, useTheme } from "react-native-paper";
import { MultiSelectInputProps } from "./types";
import { Pressable, View } from "react-native";
import { Tag } from "../../Tag";
import { multiSelectStyles } from "./styles";

export const MultiSelectInput = <ValueType,>({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  options,
  label,
  isLoading = false,
  index = 0,
  icon,
  isDense = false,
}: MultiSelectInputProps<ValueType>) => {
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  const selectedValues: ValueType[] = Array.isArray(value) ? value : [];

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    onBlur?.();
    setOpen(false);
  };

  const toggleValue = (optionValue: ValueType) => {
    const isSelected = selectedValues.some((v) => v === optionValue);

    onChange(
      isSelected
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue],
    );
  };

  const selectedOptions = options.filter((option) =>
    selectedValues.some((v) => v === option.value),
  );

  return (
    <View style={multiSelectStyles.container}>
      <Menu
        key={isOpen ? "open" : "closed"}
        visible={isOpen}
        onDismiss={onClose}
        anchor={
          isLoading ? (
            <TextInput
              isLoading={true}
              index={index}
              isEditable={false}
              isDense={isDense}
            />
          ) : (
            <Pressable onPress={onOpen}>
              <TextInput
                value=""
                isError={isError}
                label={label}
                isEditable={false}
                isDisabled={isDisabled}
                onPress={onOpen}
                icon={icon}
                isDense={isDense}
                type="select"
              />
            </Pressable>
          )
        }
        anchorPosition="bottom"
        contentStyle={{ backgroundColor: theme.colors.surfaceVariant }}
      >
        {options?.map(({ label, value: optionValue }) => (
          <Menu.Item
            title={label}
            onPress={() => toggleValue(optionValue)}
            key={
              typeof optionValue === "string"
                ? optionValue
                : JSON.stringify(optionValue)
            }
          />
        ))}
      </Menu>

      {selectedOptions.length ? (
        <View style={multiSelectStyles.tagsContainer}>
          {selectedOptions.map((option) => (
            <Tag
              key={
                typeof option.value === "string"
                  ? option.value
                  : JSON.stringify(option.value)
              }
              text={option.label}
              icon="close"
              onPress={() => toggleValue(option.value)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};
