import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addressRequestKeys,
  addressRequests,
  AddressSuggestionType,
} from "../requests";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Crypto from "expo-crypto";

export const useGetAddressSuggestionsQuery = ({
  searchTerm,
  proximity,
}: {
  searchTerm: string;
  proximity?: { lat: number; lng: number } | null;
}) => {
  const sessionIdRef = useRef<string>(Crypto.randomUUID());
  const queryClient = useQueryClient();

  const queryKey = addressRequestKeys.suggestAddresses({
    searchTerm,
    sessionId: sessionIdRef.current,
  });

  if (!searchTerm) {
    sessionIdRef.current = Crypto.randomUUID();
  }

  useEffect(() => {
    if (!searchTerm || searchTerm.replace(" ", "").length < 3) {
      queryClient.removeQueries({ queryKey });
    }
  }, [queryClient, searchTerm]);

  const queryFn = async () =>
    addressRequests.suggestAddresses({
      searchTerm,
      sessionId: sessionIdRef.current,
    });

  const query = useQuery({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
    retry: false,
    enabled: !!searchTerm && searchTerm.replace(" ", "").length > 3,
  });

  return {
    ...query,
    data: searchTerm ? query.data : undefined,
    sessionId: sessionIdRef.current,
    queryKey,
  };
};
