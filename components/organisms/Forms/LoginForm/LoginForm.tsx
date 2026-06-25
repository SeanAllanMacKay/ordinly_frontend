import React from "react";
import { UseFormReturn } from "react-hook-form";
import { EmailFieldInput, Form, FormField, TextInput } from "@/components";
import { passwordValidator, requiredValidator } from "@/util/validation";

export type LoginFormFieldValues = {
  email: string;
  password: string;
};

export const LoginForm = ({
  form,
}: {
  form: UseFormReturn<LoginFormFieldValues>;
}) => {
  return (
    <Form form={form}>
      <EmailFieldInput
        name="email"
        label="Email"
        validation={{ requiredValidator }}
      />

      <FormField
        name="password"
        label="Password"
        component={(fieldProps) => (
          <TextInput {...fieldProps} type="password" />
        )}
        validation={{ requiredValidator, passwordValidator }}
      />
    </Form>
  );
};
