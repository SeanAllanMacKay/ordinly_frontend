import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Screen, Button, Card, LoginFormFieldValues } from "@/components";

import { View } from "react-native";
import { LoginForm, LoginFormSubmissionButton } from "@/components";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const form = useForm<LoginFormFieldValues>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Login" });
  }, [navigation]);

  const onSignUp = () => router.push("/");

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
            title="Login"
            style={{ padding: 16 }}
            actions={[
              <Button onPress={onSignUp}>Sign up</Button>,
              <LoginFormSubmissionButton form={form} />,
            ]}
          >
            <LoginForm form={form} />
          </Card>
        </View>
      </View>
    </Screen>
  );
};
