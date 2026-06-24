import React from "react";
import { useGetRolesQuery } from "@/api";
import { emailValidator, requiredValidator } from "@/util/validation";
import { SelectFieldInput, TextFieldInput } from "@/components/molecules";

export const AddWorkerForm = () => {
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
        label="Email"
        validation={{ emailValidator }}
      />

      <SelectFieldInput
        name="roleId"
        label="Role"
        options={roleOptions}
        validation={{ requiredValidator }}
      />
    </>
  );
};
