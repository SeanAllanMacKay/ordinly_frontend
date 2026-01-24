import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.signUp(),
    mutationFn: userRequests.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });
    },
  });
};
