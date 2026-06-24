import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddRoleFormFieldTypes } from "./types";

export const AddRoleProvider = ({ children }: PropsWithChildren) => {
  const addRoleForm = useForm<AddRoleFormFieldTypes>({
    mode: "all",
  });

  return <Form form={addRoleForm}>{children}</Form>;
};
