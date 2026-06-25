import React from "react";
import { useTranslation } from "react-i18next";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";

export const AddClientForm = () => {
  const { t } = useTranslation("clients");

  return (
    <>
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
