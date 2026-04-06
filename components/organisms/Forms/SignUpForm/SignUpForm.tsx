import React from "react";
import { Form, FormField, TextInput } from "@/components";
import {
  emailValidator,
  passwordValidator,
  requiredValidator,
} from "@/util/validation";
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
