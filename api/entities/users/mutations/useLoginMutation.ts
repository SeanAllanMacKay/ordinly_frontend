import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.login(),
    mutationFn: userRequests.login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });
    },
  });
};
