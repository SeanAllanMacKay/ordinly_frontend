import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { userRequests, userRequestKeys } from "../requests";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: userRequestKeys.logout(),
    mutationFn: userRequests.logout,
    onSuccess: () => {
      // Drop every cached query so the next user never sees the previous
      // user's companies, projects, or other entity data.
      queryClient.clear();
      // Set the current-user query to null synchronously so the auth gate flips
      // to unauthenticated without a loading state — that loading state would
      // unmount the navigator and swallow the redirect below.
      queryClient.setQueryData(userRequestKeys.getCurrentUser(), null);
      // Return to the index so the now-signed-out user lands on the entry
      // screen rather than a stale deep authenticated path.
      router.replace("/");
    },
  });
};
