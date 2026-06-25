import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddContactFormFieldTypes } from "./types";

export const AddContactProvider = ({ children }: PropsWithChildren) => {
  const addContactForm = useForm<AddContactFormFieldTypes>({
    mode: "all",
    defaultValues: {
      name: "",
      role: "",
      description: "",
      emails: [],
      phoneNumbers: [],
      locations: [],
    },
  });

  return <Form form={addContactForm}>{children}</Form>;
};
