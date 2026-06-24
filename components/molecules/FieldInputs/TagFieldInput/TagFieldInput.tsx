import { FormField, TagInput } from "@/components/atoms";
import { TagFieldInputProps } from "./types";
import React from "react";

export const TagFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  options,
  icon,
}: TagFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      defaultValue={defaultValue}
      validation={validation}
      component={(props) => (
        <TagInput {...props} options={options} icon={icon} />
      )}
    />
  );
};
