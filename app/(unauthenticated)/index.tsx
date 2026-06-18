import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { UnauthorizedSignUpScreen } from "@/components/screens";

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Sign Up" });
  }, [navigation]);

  return <UnauthorizedSignUpScreen onLogin={() => router.replace("/login")} />;
};

export default SignUp;
