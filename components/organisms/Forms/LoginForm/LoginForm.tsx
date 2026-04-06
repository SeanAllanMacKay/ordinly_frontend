import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, TextInput } from "@/components";
import {
  emailValidator,
  passwordValidator,
  requiredValidator,
} from "@/util/validation";

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
      <FormField
        name="email"
        label="Email"
        component={TextInput}
        validation={{ requiredValidator, emailValidator }}
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
