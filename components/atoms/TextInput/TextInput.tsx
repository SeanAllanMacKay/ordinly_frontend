import React, { useState } from "react";
import { TextInput as RNPTextInput } from "react-native-paper";
import { Skeleton } from "../Skeleton";
import { TextInputProps } from "./types";
import { textInputStyles } from "./styles";

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
}: TextInputProps) => {
  const [isSecure, setIsSecure] = useState(type === "password" ? true : false);

  return isLoading ? (
    <Skeleton height={type === "multiline" ? 68.41 : 48} delay={index * 100} />
  ) : (
    <RNPTextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      onPress={() => {
        onPress?.();
      }}
      label={label}
      disabled={isDisabled}
      error={isError}
      mode={"outlined"}
      secureTextEntry={isSecure}
      contentStyle={[onPress && textInputStyles.pressable]}
      right={
        type === "password" ? (
          <RNPTextInput.Icon
            icon={isSecure ? "eye" : "eye-slash"}
            onPress={() => setIsSecure(!isSecure)}
          />
        ) : undefined
      }
      multiline={type === "multiline"}
      autoCapitalize="none"
      editable={isEditable}
    />
  );
};
