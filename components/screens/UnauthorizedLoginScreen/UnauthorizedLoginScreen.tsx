import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("auth");
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
            title={t("login.title")}
            actions={[
              <Button
                key="signup"
                onPress={onSignUp}
                label={t("signUp.submit")}
              />,
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
