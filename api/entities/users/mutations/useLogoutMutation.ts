import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.logout(),
    mutationFn: userRequests.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });
    },
  });
};
