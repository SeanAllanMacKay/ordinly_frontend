import React, { useState } from "react";
import { TextInput as RNPTextInput } from "react-native-paper";
import { Skeleton } from "../Skeleton";
import { TextInputProps } from "./types";
import { textInputStyles } from "./styles";
import { Spacing } from "@/styles";

export const TextInput = ({
  value,
  onChange,
  onBlur,
  onPress,
  isError,
  isDisabled,
  label,
  type = "text",
  isLoading = false,
  index = 0,
  isEditable = true,
  isAutoFocus = false,
  icon,
  isDense,
}: TextInputProps) => {
  const [isSecure, setIsSecure] = useState(type === "password" ? true : false);
  const [isFocused, setIsFocused] = useState(false);

  return isLoading ? (
    <Skeleton height={type === "multiline" ? 68.41 : 48} delay={index * 100} />
  ) : (
    <RNPTextInput
      value={value}
      onChangeText={onChange}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
        onBlur?.();
      }}
      onPress={() => {
        onPress?.();
      }}
      label={label}
      disabled={isDisabled}
      error={isError}
      mode={"outlined"}
      secureTextEntry={isSecure}
      contentStyle={[
        icon && { minWidth: 0, marginLeft: 35, marginRight: 35 },
        (onPress || (type === "stealth" && isEditable)) &&
          textInputStyles.pressable,
      ]}
      outlineStyle={[
        type === "stealth" && !isFocused && !isError
          ? textInputStyles.stealth
          : null,
      ]}
      right={
        type === "password" ? (
          <RNPTextInput.Icon
            icon={isSecure ? "eye" : "eye-slash"}
            onPress={() => setIsSecure(!isSecure)}
          />
        ) : type === "select" ? (
          <RNPTextInput.Icon
            icon="chevron-down"
            disabled={true}
            style={{ marginLeft: 24 }}
          />
        ) : undefined
      }
      left={
        icon ? (
          <RNPTextInput.Icon
            icon={icon}
            style={{ marginLeft: -Spacing.md }}
            disabled
          />
        ) : undefined
      }
      multiline={type === "multiline" || type === "stealth"}
      dense={type === "stealth" || isDense}
      autoCapitalize="none"
      editable={isEditable}
      autoFocus={isAutoFocus}
      style={{ minWidth: 0 }}
    />
  );
};
