import React from "react";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  ImageFieldInput,
  TextFieldInput,
} from "@/components/molecules";

export const AddCompanyForm = () => {
  return (
    <>
      <ImageFieldInput name="logo" />

      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput name="description" label="Description" />
    </>
  );
};
