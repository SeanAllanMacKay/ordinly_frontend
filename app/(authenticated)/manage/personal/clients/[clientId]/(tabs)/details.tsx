import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { ClientDetailsScreen } from "@/components/screens";

const ClientDetails = () => {
  const { clientId } = useGlobalSearchParams<{ clientId: string }>();

  return <ClientDetailsScreen clientId={clientId} />;
};

export default ClientDetails;
