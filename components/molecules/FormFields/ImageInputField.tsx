import { FormField, ImageInput } from "@/components/atoms";
import { ImageInputFieldProps } from "./types";
import React from "react";

export const ImageInputField = ({ name, validation }: ImageInputFieldProps) => {
  return (
    <FormField
      name={name}
      component={(props) => <ImageInput {...props} />}
      validation={validation}
    />
  );
};
