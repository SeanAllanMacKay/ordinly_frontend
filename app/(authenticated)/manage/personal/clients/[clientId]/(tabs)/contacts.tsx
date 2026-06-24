import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { ClientContactsScreen } from "@/components/screens";

const ClientContacts = () => {
  const { clientId } = useGlobalSearchParams<{ clientId: string }>();

  return <ClientContactsScreen clientId={clientId} />;
};

export default ClientContacts;
