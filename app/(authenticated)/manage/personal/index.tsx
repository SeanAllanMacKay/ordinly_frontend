import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { PersonalHomeScreen } from "@/components/screens";

const Dashboard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "headers.dashboard" });
  }, [navigation]);

  return <PersonalHomeScreen />;
};

export default Dashboard;
