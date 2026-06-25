import React from "react";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/api";
import { Button } from "@/components";
import { UseFormReturn } from "react-hook-form";
import { LoginFormFieldValues } from "./LoginForm";

export const LoginFormSubmissionButton = ({
  form,
}: {
  form: UseFormReturn<LoginFormFieldValues>;
}) => {
  const { t } = useTranslation("auth");
  const loginMutation = useLoginMutation();

  const onSubmit = form.handleSubmit(async (formValues) => {
    try {
      await loginMutation.mutateAsync(formValues);
    } catch (e: any) {
      form.setError("root.serverError", {
        message: e?.error ?? t("login.serverError"),
      });
    }
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={form.formState.isSubmitting}
      label={t("login.submit")}
    />
  );
};
