import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddCompanyFormFieldTypes } from "./types";

export const AddCompanyProvider = ({ children }: PropsWithChildren) => {
  const addCompanyForm = useForm<AddCompanyFormFieldTypes>({
    mode: "all",
  });

  return <Form form={addCompanyForm}>{children}</Form>;
};
