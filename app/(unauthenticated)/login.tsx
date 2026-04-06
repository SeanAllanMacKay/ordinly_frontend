import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Screen, Button, Card, LoginFormFieldValues } from "@/components";

import { View } from "react-native";
import { LoginForm, LoginFormSubmissionButton } from "@/components";

export default function Login() {
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

  const onSignUp = () => router.replace("/");

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
          <Card
            title="Login"
            actions={[
              <Button onPress={onSignUp} label="Sign up" />,
              <LoginFormSubmissionButton form={form} />,
            ]}
          >
            <LoginForm form={form} />
          </Card>
        </View>
      </View>
    </Screen>
  );
}
