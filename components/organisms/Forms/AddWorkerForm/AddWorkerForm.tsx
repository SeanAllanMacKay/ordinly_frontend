import React from "react";
import { useGetRolesQuery } from "@/api";
import { emailValidator, requiredValidator } from "@/util/validation";
import { SelectInputField, TextInputField } from "@/components/molecules";

export const AddWorkerForm = () => {
  const roles = useGetRolesQuery();

  const roleOptions =
    roles.data?.roles.map((role) => ({
      value: role.id,
      label: role.name,
    })) ?? [];

  return (
    <>
      <TextInputField
        name="email"
        label="Email"
        validation={{ emailValidator }}
      />

      <SelectInputField
        name="roleId"
        label="Role"
        options={roleOptions}
        validation={{ requiredValidator }}
      />
    </>
  );
};
