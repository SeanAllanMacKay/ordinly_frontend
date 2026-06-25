import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.logout(),
    mutationFn: userRequests.logout,
    onSuccess: () => {
      // Drop every cached query so the next user never sees the previous
      // user's companies, projects, or other entity data.
      queryClient.clear();
      // Set the current-user query to null synchronously so the root layout's
      // `Stack.Protected` guard flips to unauthenticated (without a loading
      // state). Navigation is guard-driven: the `(authenticated)` group unmounts
      // and expo-router focuses the `(unauthenticated)` entry screen. An
      // imperative `router.replace` here would race that teardown and be dropped.
      queryClient.setQueryData(userRequestKeys.getCurrentUser(), null);
    },
  });
};
