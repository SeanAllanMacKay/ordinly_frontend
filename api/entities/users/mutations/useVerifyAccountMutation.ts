import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useVerifyAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.verifyAccount(),
    mutationFn: userRequests.verifyAccount,
    // Refresh the current user so `isVerified` flips and the unverified banner
    // clears for an already-signed-in user verifying via the email link.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });
    },
  });
};
