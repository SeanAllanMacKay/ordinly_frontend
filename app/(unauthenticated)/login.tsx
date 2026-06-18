import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { UnauthorizedLoginScreen } from "@/components/screens";

const Login = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Login" });
  }, [navigation]);

  return <UnauthorizedLoginScreen onSignUp={() => router.replace("/")} />;
};

export default Login;
