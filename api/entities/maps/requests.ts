import { GET, REQUEST_ACTIONS } from "@/api/requests";

export type AddressSuggestionType =
  | "address"
  | "region"
  | "postal-code"
  | "city";

const addressTypeMapping: Record<AddressSuggestionType, string> = {
  address: "address",
  region: "region",
  "postal-code": "postcode",
  city: "place",
};

export const addressRequests = {
  suggestAddresses: async ({
    searchTerm,
    proximity,
    sessionId,
  }: {
    searchTerm: string;
    proximity?: { lat: number; lng: number } | null;
    sessionId: string;
  }) =>
    await GET({
      endpoint: `/maps/search/searchbox/v1/suggest`,
      queryParams: {
        q: searchTerm,
        limit: 10,
        proximity: proximity ? `${proximity.lng},${proximity.lat}` : "ip",
        session_token: sessionId,
      },
    }),
  retrieveAddress: async ({
    mapboxId,
    sessionId,
  }: {
    mapboxId: string;
    sessionId: string;
  }) =>
    await GET({
      endpoint: `/maps/search/searchbox/v1/retrieve/${mapboxId}`,
      queryParams: {
        session_token: sessionId,
      },
    }),
};

export const addressRequestKeys = {
  suggestAddresses: (args: { searchTerm: string; sessionId: string }) => [
    REQUEST_ACTIONS.GET,
    "address",
    "suggestion",
    args,
  ],
};
