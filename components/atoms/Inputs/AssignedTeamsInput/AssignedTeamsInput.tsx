import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";

import { Icon } from "@/components/atoms/Icon";
import { Modal } from "@/components/atoms/Modal";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { AvatarStack } from "@/components/molecules/AvatarStack";
import { TeamAvatar } from "@/components/organisms/Avatars/TeamAvatar";

import { AssignedTeamsInputProps } from "./types";
import { assignedTeamsInputStyles } from "./styles";

export const AssignedTeamsInput = ({
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
}: AssignedTeamsInputProps) => {
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
            assignedTeamsInputStyles.field,
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
              style={assignedTeamsInputStyles.row}
            >
              <View style={assignedTeamsInputStyles.rowLeft}>
                <TeamAvatar
                  name={option.label}
                  imageURL={option.imageURL}
                  size="md"
                />

                <View style={assignedTeamsInputStyles.rowText}>
                  <Typography>{option.label}</Typography>

                  {option.members.length ? (
                    <AvatarStack
                      items={option.members}
                      size="sm"
                      shape="circle"
                    />
                  ) : null}
                </View>
              </View>

              <Checkbox.Android status={isSelected ? "checked" : "unchecked"} />
            </Pressable>
          );
        })}
      </Modal>
    </>
  );
};
