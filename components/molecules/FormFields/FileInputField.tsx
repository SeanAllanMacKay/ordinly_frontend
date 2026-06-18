import { FormField } from "@/components/atoms";
import { TextInputFieldProps } from "./types";
import React from "react";
import { FileInput } from "@/components/atoms/FileInput";

export const FileInputField = ({ name, validation }: TextInputFieldProps) => {
  return (
    <FormField
      name={name}
      component={({ onChange, value }) => (
        <FileInput value={value} onChange={onChange} />
      )}
      validation={validation}
    />
  );
};
