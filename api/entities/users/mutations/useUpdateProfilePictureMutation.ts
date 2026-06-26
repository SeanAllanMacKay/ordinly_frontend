import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useUpdateProfilePictureMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userRequestKeys.updateProfilePicture(),
    mutationFn: userRequests.updateProfilePicture,
    onSuccess: () => {
      // Re-fetch the current user so the new picture (and any initials fallback)
      // reflects everywhere it's rendered.
      queryClient.invalidateQueries({
        queryKey: userRequestKeys.getCurrentUser(),
      });

      onSuccess?.();
    },
  });
};
