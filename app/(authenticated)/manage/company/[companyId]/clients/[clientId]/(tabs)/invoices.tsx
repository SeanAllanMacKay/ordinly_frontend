import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { ClientInvoicesScreen } from "@/components/screens";

const ClientInvoices = () => {
  const { clientId } = useGlobalSearchParams<{ clientId: string }>();

  return <ClientInvoicesScreen clientId={clientId} />;
};

export default ClientInvoices;
