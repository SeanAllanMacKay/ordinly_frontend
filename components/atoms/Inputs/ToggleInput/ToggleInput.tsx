import React from "react";
import { Switch } from "react-native-paper";
import { ToggleInputProps } from "./types";
import { usePermissionGate } from "@/util/permissions/usePermissionGate";

export const ToggleInput = ({
  permission,
  deniedMessage,
  ...props
}: ToggleInputProps) => {
  // Only opt into the gating hook when a permission is declared, so plain
  // toggles stay free of the extra company-query subscription.
  return permission ? (
    <GatedToggleInput
      permission={permission}
      deniedMessage={deniedMessage}
      {...props}
    />
  ) : (
    <Switch
      value={props.value}
      onValueChange={props.onChange}
      disabled={props.isDisabled}
    />
  );
};

const GatedToggleInput = ({
  permission,
  deniedMessage,
  value,
  onChange,
  isDisabled,
}: ToggleInputProps) => {
  const { isDenied, showDenied } = usePermissionGate({
    permission,
    deniedMessage,
  });

  // When denied, surface the modal on press and leave `value` untouched (the
  // switch won't flip because `onChange` is never called). Stays enabled so the
  // press is registered.
  return (
    <Switch
      value={value}
      onValueChange={isDenied ? showDenied : onChange}
      disabled={isDenied ? false : isDisabled}
    />
  );
};
