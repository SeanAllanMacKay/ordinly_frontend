import React from "react";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextInputField,
  ImageInputField,
  TextInputField,
} from "@/components/molecules";

export const AddCompanyForm = () => {
  return (
    <>
      <ImageInputField name="logo" />

      <TextInputField
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <EnrichedTextInputField name="description" label="Description" />
    </>
  );
};
