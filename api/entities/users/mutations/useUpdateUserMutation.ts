import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.updateUser(),
    mutationFn: userRequests.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });
    },
  });
};
