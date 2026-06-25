import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { userRequests, userRequestKeys } from "../requests";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: userRequestKeys.login(),
    mutationFn: userRequests.login,
    onSuccess: (data) => {
      // Start from a clean cache so a prior session that ended without an
      // explicit logout can't leak another user's data into this one.
      queryClient.clear();
      // Seed the current-user query from the login response so the auth gate
      // flips to authenticated synchronously. If we instead let the cleared
      // query refetch, the brief loading state unmounts the navigator and the
      // redirect below is lost.
      queryClient.setQueryData(userRequestKeys.getCurrentUser(), data);
      // Reset the path to the index; the authenticated root then redirects on
      // to the personal workspace.
      router.replace("/");
    },
  });
};
