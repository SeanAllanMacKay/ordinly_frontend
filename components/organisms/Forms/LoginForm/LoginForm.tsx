import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("auth");

  return (
    <Form form={form}>
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
    </Form>
  );
};
