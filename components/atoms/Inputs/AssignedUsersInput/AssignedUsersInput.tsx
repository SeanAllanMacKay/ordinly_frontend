import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";

import { Icon } from "@/components/atoms/Icon";
import { Modal } from "@/components/atoms/Modal";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { AvatarStack } from "@/components/molecules/AvatarStack";
import { UserAvatar } from "@/components/organisms/Avatars";

import { AssignedUsersInputProps } from "./types";
import { assignedUsersInputStyles } from "./styles";

export const AssignedUsersInput = ({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  isLoading = false,
  index = 0,
  options,
  placeholder,
  modalTitle,
}: AssignedUsersInputProps) => {
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  const selectedValues: string[] = Array.isArray(value) ? value : [];

  const toggleValue = (optionValue: string) => {
    const isSelected = selectedValues.includes(optionValue);

    onChange(
      isSelected
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue],
    );
  };

  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  );

  const onClose = () => {
    onBlur?.();
    setOpen(false);
  };

  if (isLoading) {
    return <Skeleton height={48} delay={index * 100} />;
  }

  return (
    <>
      <Pressable
        onPress={!isDisabled ? () => setOpen(true) : undefined}
        disabled={isDisabled}
      >
        <View
          style={[
            assignedUsersInputStyles.field,
            {
              borderColor: isError ? theme.colors.error : theme.colors.outline,
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
        >
          {selectedOptions.length ? (
            <AvatarStack
              items={selectedOptions.map((option) => ({
                name: option.label,
                imageURL: option.imageURL,
              }))}
              size="sm"
              shape="circle"
            />
          ) : (
            <Typography color="onSurfaceVariant">{placeholder}</Typography>
          )}

          <Icon name="chevron-down" color="onSurfaceVariant" />
        </View>
      </Pressable>

      <Modal
        isVisible={isOpen}
        onClose={onClose}
        title={modalTitle ?? placeholder}
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <Pressable
              key={option.value}
              onPress={() => toggleValue(option.value)}
              style={assignedUsersInputStyles.row}
            >
              <View style={assignedUsersInputStyles.rowLeft}>
                <UserAvatar
                  name={option.label}
                  imageURL={option.imageURL}
                  size="md"
                />

                <View style={assignedUsersInputStyles.rowText}>
                  <Typography>{option.label}</Typography>

                  {option.description ? (
                    <Typography size="sm" color="onSurfaceVariant">
                      {option.description}
                    </Typography>
                  ) : null}
                </View>
              </View>

              <Checkbox.Android
                status={isSelected ? "checked" : "unchecked"}
              />
            </Pressable>
          );
        })}
      </Modal>
    </>
  );
};
