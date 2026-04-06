import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import {
  Screen,
  Button,
  Card,
  SignUpFormFieldValues,
  SignUpFormSubmissionButton,
  SignUpForm,
  Typography,
} from "@/components";
import { View } from "react-native";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const form = useForm<SignUpFormFieldValues>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      "verify-password": "",
    },
  });

  const email = useWatch({ control: form.control, name: "email" });

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Sign Up" });
  }, [navigation]);

  const onLogin = () => router.replace("/login");
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {form.formState.isSubmitSuccessful ? (
            <Card
              title="Verification email sent"
              actions={[
                <Button onPress={onLogin} label="Go to login screen" />,
              ]}
            >
              <Typography>
                We just sent a verification email to {email}. You can follow the
                link in that email to log in once you've verified your account.
              </Typography>
            </Card>
          ) : (
            <Card
              title="Sign up"
              actions={[
                <Button onPress={onLogin} label="Login" />,
                <SignUpFormSubmissionButton form={form} />,
              ]}
            >
              <SignUpForm form={form} />
            </Card>
          )}
        </View>
      </View>
    </Screen>
  );
}
