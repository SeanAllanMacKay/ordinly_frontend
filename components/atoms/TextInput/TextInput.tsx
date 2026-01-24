import React, { useState } from "react";
import { TextInput as RNPTextInput } from "react-native-paper";
import { Text } from "react-native-paper";

export type TextInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  onBlur: () => void;
  isError: boolean;
  isDisabled?: boolean;
  label?: string;
  type?: "text" | "password" | "multiline";
};

export const TextInput = ({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  label,
  type = "text",
}: TextInputProps) => {
  const [isSecure, setIsSecure] = useState(type === "password" ? true : false);

  return (
    <RNPTextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      label={label}
      disabled={isDisabled}
      error={isError}
      mode={"outlined"}
      secureTextEntry={isSecure}
      right={
        type === "password" ? (
          <RNPTextInput.Icon
            icon={isSecure ? "eye" : "eye-slash"}
            onPress={() => setIsSecure(!isSecure)}
          />
        ) : undefined
      }
      multiline={type === "multiline"}
    />
  );
};
