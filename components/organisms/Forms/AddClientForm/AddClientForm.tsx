import React from "react";
import { useTranslation } from "react-i18next";
import { requiredValidator } from "@/util/validation";
import {
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import {
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddClientForm = () => {
  const { t } = useTranslation("clients");
  const companyId = useActiveCompanyId();

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

      <MultiWorkerDataFieldInput
        name="userIds"
        label={t("workers")}
        companyId={companyId ?? ""}
      />

      <MultiTeamDataFieldInput
        name="teamIds"
        label={t("teams")}
        companyId={companyId ?? ""}
      />
    </>
  );
};
