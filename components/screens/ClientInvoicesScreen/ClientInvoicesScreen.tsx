import React from "react";
import { Text } from "react-native";
import { Screen } from "@/components";

export const ClientInvoicesScreen = ({
  clientId: _clientId,
}: {
  clientId: string;
}) => {
  return (
    <Screen>
      <Text>Invoices</Text>
    </Screen>
  );
};
