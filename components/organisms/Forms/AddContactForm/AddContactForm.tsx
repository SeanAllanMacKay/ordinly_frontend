import React from "react";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  MultiEmailFieldInput,
  MultiPhoneNumberFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import { MultiLocationDataFieldInput } from "@/components/organisms";

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

      <MultiEmailFieldInput name="emails" label="Email addresses" />

      <MultiPhoneNumberFieldInput name="phoneNumbers" label="Phone numbers" />

      <MultiLocationDataFieldInput name="locations" label="Locations" />
    </>
  );
};
