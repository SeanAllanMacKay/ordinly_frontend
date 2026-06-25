import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("auth");

  return (
    <Form form={form}>
      <FormField
        name="name"
        label={t("name")}
        component={TextInput}
        validation={{ requiredValidator }}
      />

      <EmailFieldInput
        name="email"
        label={t("email")}
        validation={{ requiredValidator }}
      />

      <FormField
        name="password"
        label={t("password")}
        component={(fieldProps) => (
          <TextInput {...fieldProps} type="password" />
        )}
        validation={{ requiredValidator, passwordValidator }}
      />

      <FormField
        name="verify-password"
        label={t("signUp.verifyPassword")}
        component={(fieldProps) => (
          <TextInput {...fieldProps} type="password" />
        )}
        validation={{
          requiredValidator,
          matches: (value, allValues) => {
            if (value !== allValues["password"]) {
              return "auth:passwordMismatch";
            }
          },
        }}
      />
    </Form>
  );
};
