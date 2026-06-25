import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.login(),
    mutationFn: userRequests.login,
    onSuccess: (data) => {
      // Start from a clean cache so a prior session that ended without an
      // explicit logout can't leak another user's data into this one.
      queryClient.clear();
      // Seed the current-user query from the login response so the root
      // layout's `Stack.Protected` guard flips to authenticated synchronously.
      // Navigation is guard-driven — once the guard flips, expo-router focuses
      // the `(authenticated)` group, whose index `<Redirect>`s on to the
      // personal workspace. An imperative `router.replace` here would race that
      // teardown and get dropped.
      queryClient.setQueryData(userRequestKeys.getCurrentUser(), data);
    },
  });
};
