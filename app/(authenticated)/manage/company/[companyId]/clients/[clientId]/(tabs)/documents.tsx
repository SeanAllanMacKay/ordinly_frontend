import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { ClientDocumentsScreen } from "@/components/screens";

const ClientDocuments = () => {
  const { clientId } = useGlobalSearchParams<{ clientId: string }>();

  return <ClientDocumentsScreen clientId={clientId} />;
};

export default ClientDocuments;
