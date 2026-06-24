import React from "react";
import { Text } from "react-native";
import { Screen } from "@/components";

export const ClientDocumentsScreen = ({
  clientId: _clientId,
}: {
  clientId: string;
}) => {
  return (
    <Screen>
      <Text>Documents</Text>
    </Screen>
  );
};
