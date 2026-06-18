import React from "react";
import { useLoginMutation } from "@/api";
import { Button } from "@/components";
import { UseFormReturn } from "react-hook-form";
import { LoginFormFieldValues } from "./LoginForm";

export const LoginFormSubmissionButton = ({
  form,
}: {
  form: UseFormReturn<LoginFormFieldValues>;
}) => {
  const loginMutation = useLoginMutation();

  const onSubmit = form.handleSubmit(async (formValues) => {
    try {
      await loginMutation.mutateAsync(formValues);
    } catch (e: any) {
      form.setError("root.serverError", {
        message: e?.error ?? "Something went wrong. Please try again.",
      });
    }
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={form.formState.isSubmitting}
      label={"Login"}
    />
  );
};
