import { useQuery } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useGetCurrentUserQuery = () =>
  useQuery({
    queryKey: userRequestKeys.getCurrentUser(),
    // A 401 means "not logged in" — a legitimate state, not a failure. Resolve
    // it to `null` so the query succeeds and respects `staleTime: Infinity`.
    // (If we let it throw, the errored query has no data and TanStack Query
    // treats it as perpetually stale, refetching on every remount.)
    queryFn: async () => {
      try {
        return await userRequests.getCurrentUser();
      } catch (caught: any) {
        if (caught?.status === 401 || caught?.response?.status === 401) {
          return null;
        }

        throw caught;
      }
    },
    staleTime: Infinity,
    retry: false,
  });
