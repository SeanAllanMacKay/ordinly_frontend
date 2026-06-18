import React, { useEffect } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { VerifyAccountScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const VerifyAccount = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const { code } = useLocalSearchParams<{ code: string }>();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Verify account" });
  }, [navigation]);

  const onRedirect = (hasUser: boolean) => {
    router.replace(hasUser ? routes.manage.root() : "/login");
  };

  return <VerifyAccountScreen code={code} onRedirect={onRedirect} />;
};

export default VerifyAccount;
