import { GET, REQUEST_ACTIONS } from "@/api/requests";
import { CountryType } from "../types";

export const countryRequests = {
  listCountries: async () =>
    await GET<{
      countries: CountryType[];
    }>({
      endpoint: `/country`,
    }),
};

export const countryRequestKeys = {
  listCountries: () => [REQUEST_ACTIONS.GET, "country", "list"],
};
