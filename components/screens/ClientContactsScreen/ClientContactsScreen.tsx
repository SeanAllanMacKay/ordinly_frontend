import React from "react";
import {
  ClientContactsDataList,
  FloatingActionButton,
  Screen,
} from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ClientContactsScreen = ({
  clientId,
}: {
  clientId: string;
}) => {
  const { open } = useDrawers();

  return (
    <Screen>
      <ClientContactsDataList clientId={clientId} />

      <FloatingActionButton icon="plus" onPress={() => open("add-contact")} />
    </Screen>
  );
};
