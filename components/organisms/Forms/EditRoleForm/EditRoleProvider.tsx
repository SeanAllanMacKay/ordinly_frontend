import { useGetRoleQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditRoleFormFieldTypes } from "./types";

export const EditRoleProvider = ({
  roleId,
  children,
}: PropsWithChildren<{ roleId: string }>) => {
  const roleQuery = useGetRoleQuery({ roleId });

  const values = useMemo<EditRoleFormFieldTypes | undefined>(() => {
    if (roleQuery.data) {
      return {
        name: roleQuery.data.role.name,
        description: roleQuery.data.role.description ?? "",
      };
    }
  }, [roleQuery.data]);

  const editRoleForm = useForm<EditRoleFormFieldTypes>({
    mode: "all",
    values,
  });

  return (
    <Form form={editRoleForm} isLoading={roleQuery.isLoading}>
      {children}
    </Form>
  );
};
