import React from "react";
import { useTranslation } from "react-i18next";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  MultiEmailFieldInput,
  MultiPhoneNumberFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import { MultiLocationDataFieldInput } from "@/components/organisms";

export const AddContactForm = () => {
  const { t } = useTranslation("clients");

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <TextFieldInput name="role" label={t("addContact.roleLabel")} />

      <EnrichedTextFieldInput
        name="description"
        label={t("description")}
      />

      <MultiEmailFieldInput
        name="emails"
        label={t("addContact.emailsLabel")}
      />

      <MultiPhoneNumberFieldInput
        name="phoneNumbers"
        label={t("addContact.phoneNumbersLabel")}
      />

      <MultiLocationDataFieldInput
        name="locations"
        label={t("addContact.locationsLabel")}
      />
    </>
  );
};
