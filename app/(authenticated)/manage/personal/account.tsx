import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { PersonalSettingsScreen } from "@/components/screens";

const Account = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Account" });
  }, [navigation]);

  return <PersonalSettingsScreen />;
};

export default Account;
