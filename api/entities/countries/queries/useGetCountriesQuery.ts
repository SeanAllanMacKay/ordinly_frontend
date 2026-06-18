import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { countryRequests, countryRequestKeys } from "../requests";

export const useGetCountriesQuery = () => {
  return useQuery({
    queryKey: countryRequestKeys.listCountries(),
    queryFn: countryRequests.listCountries,
    placeholderData: keepPreviousData,
    retry: false,
  });
};
