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
    ({ "verify-password": _verifyEmail, ...formValues }) =>
      signUpMutation.mutate(formValues),
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
