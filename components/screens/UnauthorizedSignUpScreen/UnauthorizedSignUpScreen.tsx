import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Screen,
  SignUpForm,
  SignUpFormFieldValues,
  SignUpFormSubmissionButton,
  Typography,
} from "@/components";
import { View } from "react-native";
import { unauthorizedSignUpScreenStyles } from "./styles";
import { UnauthorizedSignUpScreenProps } from "./types";

export const UnauthorizedSignUpScreen = ({
  onLogin,
}: UnauthorizedSignUpScreenProps) => {
  const form = useForm<SignUpFormFieldValues>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      "verify-password": "",
    },
  });

  return (
    <Screen>
      <View style={unauthorizedSignUpScreenStyles.container}>
        <View style={unauthorizedSignUpScreenStyles.content}>
          <Card
            title="Sign up"
            actions={[
              <Button key="login" onPress={onLogin} label="Login" />,
              <SignUpFormSubmissionButton key="submit" form={form} />,
            ]}
          >
            <SignUpForm form={form} />
            {form.formState.errors.root?.serverError ? (
              <Typography color="error">
                {form.formState.errors.root.serverError.message}
              </Typography>
            ) : null}
          </Card>
        </View>
      </View>
    </Screen>
  );
};
