import { FileInput, FormField } from "@/components/atoms";
import { FileFieldInputProps } from "./types";
import React from "react";

export const FileFieldInput = ({ name, validation }: FileFieldInputProps) => {
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
