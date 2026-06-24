import { FormField, ImageInput } from "@/components/atoms";
import { ImageFieldInputProps } from "./types";
import React from "react";

export const ImageFieldInput = ({ name, validation }: ImageFieldInputProps) => {
  return (
    <FormField
      name={name}
      component={(props) => <ImageInput {...props} />}
      validation={validation}
    />
  );
};
