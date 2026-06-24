import React from "react";
import { Text } from "react-native";
import { Screen } from "@/components";

export const ClientDetailsScreen = ({
  clientId: _clientId,
}: {
  clientId: string;
}) => {
  return (
    <Screen>
      <Text>Details</Text>
    </Screen>
  );
};
