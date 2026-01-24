import { useQuery } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useGetCurrentUserQuery = () =>
  useQuery({
    queryKey: userRequestKeys.getCurrentUser(),
    queryFn: userRequests.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });
