import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useDeleteProfilePictureMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.deleteProfilePicture(),
    mutationFn: userRequests.deleteProfilePicture,
    onSuccess: () => {
      // Re-fetch the current user so the initials fallback replaces the removed
      // picture everywhere it's rendered.
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });

      onSuccess?.();
    },
  });
};
