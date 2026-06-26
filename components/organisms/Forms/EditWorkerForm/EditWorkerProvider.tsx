import { useGetRolesQuery, useGetWorkerQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditWorkerFormFieldTypes } from "./types";

export const EditWorkerProvider = ({
  workerId,
  children,
}: PropsWithChildren<{ workerId: string }>) => {
  const workerQuery = useGetWorkerQuery({ userId: workerId });
  const roles = useGetRolesQuery();

  const values = useMemo<EditWorkerFormFieldTypes | undefined>(() => {
    if (workerQuery.data) {
      return {
        roleIds: workerQuery.data.member.roles.map(
          (assignment) => assignment.roleId,
        ),
      };
    }
  }, [workerQuery.data]);

  const editWorkerForm = useForm<EditWorkerFormFieldTypes>({
    mode: "all",
    defaultValues: { roleIds: [] },
    values,
  });

  return (
    <Form
      form={editWorkerForm}
      isLoading={workerQuery.isLoading || roles.isLoading}
    >
      {children}
    </Form>
  );
};
