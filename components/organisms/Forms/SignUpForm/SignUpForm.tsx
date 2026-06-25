import React from "react";
import { EmailFieldInput, Form, FormField, TextInput } from "@/components";
import { passwordValidator, requiredValidator } from "@/util/validation";
import { UseFormReturn } from "react-hook-form";

export type SignUpFormFieldValues = {
  name: string;
  email: string;
  password: string;
  "verify-password": string;
};

export const SignUpForm = ({
  form,
}: {
  form: UseFormReturn<SignUpFormFieldValues>;
}) => {
  return (
    <Form form={form}>
      <FormField
        name="name"
        label="Name"
        component={TextInput}
        validation={{ requiredValidator }}
      />

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

      <FormField
        name="verify-password"
        label="Verify password"
        component={(fieldProps) => (
          <TextInput {...fieldProps} type="password" />
        )}
        validation={{
          requiredValidator,
          matches: (value, allValues) => {
            if (value !== allValues["password"]) {
              return "Must match the password";
            }
          },
        }}
      />
    </Form>
  );
};
