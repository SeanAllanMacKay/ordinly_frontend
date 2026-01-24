import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  Screen,
  Button,
  Card,
  SignUpFormFieldValues,
  SignUpFormSubmissionButton,
  SignUpForm,
} from "@/components";
import { View } from "react-native";

export const SignUpScreen = () => {
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

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Sign Up" });
  }, [navigation]);

  const onLogin = () => router.push("/login");

  return (
    <Screen
      backgroundImage={require("../../assets/images/sign-up-background.jpg")}
    >
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
          <Card
            title="Sign up"
            style={{ padding: 16 }}
            actions={[
              <Button onPress={onLogin}>Login</Button>,
              <SignUpFormSubmissionButton form={form} />,
            ]}
          >
            <SignUpForm form={form} />
          </Card>
        </View>
      </View>
    </Screen>
  );
};
