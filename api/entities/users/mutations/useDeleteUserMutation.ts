import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { userRequests, userRequestKeys } from "../requests";

export const useDeleteUserMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof userRequests.deleteUser>>,
  ) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: userRequestKeys.deleteUser(),
    mutationFn: (body: { password: string }) => userRequests.deleteUser(body),
    onSuccess: (data) => {
      // Wipe the cache so no deleted-account data lingers, then set the
      // current-user query to null synchronously so the auth gate flips to
      // unauthenticated without a loading state (which would unmount the
      // navigator and swallow the redirect). Same flow as logout.
      queryClient.clear();
      queryClient.setQueryData(userRequestKeys.getCurrentUser(), null);
      router.replace("/");

      onSuccess?.(data);
    },
  });
};
