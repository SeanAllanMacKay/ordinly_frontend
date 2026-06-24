import { useGetRolesQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddWorkerFormFieldTypes } from "./types";

export const AddWorkerProvider = ({ children }: PropsWithChildren) => {
  const addWorkerForm = useForm<AddWorkerFormFieldTypes>({
    mode: "all",
  });

  const roles = useGetRolesQuery();

  return (
    <Form form={addWorkerForm} isLoading={roles.isLoading}>
      {children}
    </Form>
  );
};
