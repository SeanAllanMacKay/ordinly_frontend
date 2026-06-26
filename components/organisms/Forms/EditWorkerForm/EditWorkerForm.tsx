import React from "react";
import { useTranslation } from "react-i18next";
import { useGetRolesQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";

// The worker update endpoint only changes the member's role set, so the edit
// form exposes a single multi-select of roles (unlike the invite form, which
// captures an email + a single starting role).
export const EditWorkerForm = () => {
  const { t } = useTranslation("companies");
  const roles = useGetRolesQuery();

  const roleOptions =
    roles.data?.roles.map((role) => ({
      value: role.id,
      label: role.name,
    })) ?? [];

  return (
    <MultiSelectFieldInput
      name="roleIds"
      label={t("editWorker.roles")}
      options={roleOptions}
    />
  );
};
