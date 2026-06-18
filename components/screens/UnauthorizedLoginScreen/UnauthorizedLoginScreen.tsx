import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  LoginForm,
  LoginFormFieldValues,
  LoginFormSubmissionButton,
  Screen,
  Typography,
} from "@/components";
import { View } from "react-native";
import { unauthorizedLoginScreenStyles } from "./styles";
import { UnauthorizedLoginScreenProps } from "./types";

export const UnauthorizedLoginScreen = ({
  onSignUp,
}: UnauthorizedLoginScreenProps) => {
  const form = useForm<LoginFormFieldValues>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Screen>
      <View style={unauthorizedLoginScreenStyles.container}>
        <View style={unauthorizedLoginScreenStyles.content}>
          <Card
            title="Login"
            actions={[
              <Button key="signup" onPress={onSignUp} label="Sign up" />,
              <LoginFormSubmissionButton key="submit" form={form} />,
            ]}
          >
            <LoginForm form={form} />
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
