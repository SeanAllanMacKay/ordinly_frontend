import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useDeleteUserMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof userRequests.deleteUser>>,
  ) => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.deleteUser(),
    mutationFn: (body: { password: string }) => userRequests.deleteUser(body),
    onSuccess: (data) => {
      // Wipe the cache so no deleted-account data lingers, then set the
      // current-user query to null synchronously so the root layout's
      // `Stack.Protected` guard flips to unauthenticated (without a loading
      // state). Navigation is guard-driven — the `(authenticated)` group
      // unmounts and expo-router focuses the `(unauthenticated)` entry screen.
      // Same flow as logout.
      queryClient.clear();
      queryClient.setQueryData(userRequestKeys.getCurrentUser(), null);

      onSuccess?.(data);
    },
  });
};
