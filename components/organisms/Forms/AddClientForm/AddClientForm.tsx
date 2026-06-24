import React from "react";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";

export const AddClientForm = () => {
  return (
    <>
      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput name="description" label="Description" />
    </>
  );
};
