import React from "react";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";

export const AddContactForm = () => {
  return (
    <>
      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <TextFieldInput name="role" label="Role" />

      <EnrichedTextFieldInput name="description" label="Description" />
    </>
  );
};
