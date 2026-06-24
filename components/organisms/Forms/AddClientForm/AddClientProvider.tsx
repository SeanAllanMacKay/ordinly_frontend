import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddClientFormFieldTypes } from "./types";

export const AddClientProvider = ({ children }: PropsWithChildren) => {
  const addClientForm = useForm<AddClientFormFieldTypes>({
    mode: "all",
  });

  return <Form form={addClientForm}>{children}</Form>;
};
