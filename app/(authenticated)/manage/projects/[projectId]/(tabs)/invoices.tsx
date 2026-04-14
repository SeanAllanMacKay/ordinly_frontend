import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { Screen } from "@/components";

export default function ProjectInvoices() {
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ projectId: string }>();

  return (
    <Screen>
      <Text>Invoices</Text>
    </Screen>
  );
}
