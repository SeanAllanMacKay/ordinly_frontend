import React from "react";
import { useTranslation } from "react-i18next";
import { useGetRolesQuery } from "@/api";
import { emailValidator, requiredValidator } from "@/util/validation";
import { SelectFieldInput, TextFieldInput } from "@/components/molecules";

export const AddWorkerForm = () => {
  const { t } = useTranslation("companies");
  const roles = useGetRolesQuery();

  const roleOptions =
    roles.data?.roles.map((role) => ({
      value: role.id,
      label: role.name,
    })) ?? [];

  return (
    <>
      <TextFieldInput
        name="email"
        label={t("email")}
        validation={{ emailValidator }}
      />

      <SelectFieldInput
        name="roleId"
        label={t("addWorker.role")}
        options={roleOptions}
        validation={{ requiredValidator }}
      />
    </>
  );
};
