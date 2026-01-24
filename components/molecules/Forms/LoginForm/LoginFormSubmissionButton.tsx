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

  const onSubmit = form.handleSubmit((formValues) =>
    loginMutation.mutate(formValues)
  );

  return (
    <Button mode="contained" onPress={onSubmit}>
      Login
    </Button>
  );
};
