import React, { useState } from "react";
import { TextInput as RNPTextInput, useTheme } from "react-native-paper";
import { Skeleton } from "../Skeleton";
import { TextInputProps } from "./types";
import { textInputStyles } from "./styles";
import { Spacing } from "@/styles";
import { Icon } from "../Icon";

export const TextInput = ({
  value,
  onChange,
  onBlur,
  onPress,
  onClear,
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
  const theme = useTheme();

  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };

  const showClear = !!onClear && !!value && !isDisabled;

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
            icon={() => (
              <Icon
                name={isSecure ? "eye" : "eye-slash"}
                color="onBackground"
              />
            )}
            onPress={() => setIsSecure(!isSecure)}
          />
        ) : showClear ? (
          <RNPTextInput.Icon
            icon={() => <Icon name="close" color="onBackground" />}
            onPress={handleClear}
          />
        ) : type === "select" ? (
          <RNPTextInput.Icon
            icon={() => <Icon name="chevron-down" color="onBackground" />}
            disabled={true}
            style={{ marginLeft: Spacing.lg }}
          />
        ) : undefined
      }
      left={
        icon ? (
          <RNPTextInput.Icon
            icon={() => <Icon name={icon} color="onBackground" />}
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
