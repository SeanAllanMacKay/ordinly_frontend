import React from "react";
import { useTranslation } from "react-i18next";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  ImageFieldInput,
  TextFieldInput,
} from "@/components/molecules";

export const AddCompanyForm = () => {
  const { t } = useTranslation("companies");

  return (
    <>
      <ImageFieldInput name="logo" />

      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput
        name="description"
        label={t("description")}
      />
    </>
  );
};
