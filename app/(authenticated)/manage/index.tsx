import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Screen } from "@/components";

export default function Dashboard() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Dashboard" });
  }, [navigation]);

  return <Screen></Screen>;
}
