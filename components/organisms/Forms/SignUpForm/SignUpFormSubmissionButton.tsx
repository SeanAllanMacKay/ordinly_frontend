import React from "react";
import { useSignUpMutation } from "@/api";
import { Button } from "@/components";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormFieldValues } from "./SignUpForm";

export const SignUpFormSubmissionButton = ({
  form,
}: {
  form: UseFormReturn<SignUpFormFieldValues>;
}) => {
  const signUpMutation = useSignUpMutation();

  const onSubmit = form.handleSubmit(
    async ({ "verify-password": _verifyPassword, ...formValues }) => {
      try {
        await signUpMutation.mutateAsync(formValues);
      } catch (e: any) {
        form.setError("root.serverError", {
          message: e?.error ?? "Something went wrong. Please try again.",
        });
      }
    },
  );

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={form.formState.isSubmitting}
      label={"Sign up"}
    />
  );
};
