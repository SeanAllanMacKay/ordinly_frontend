import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useCreateProjectMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.createProject>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectRequestKeys.createProject(),
    mutationFn: projectRequests.createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ page: 1 }),
      });

      onSuccess?.(data);
    },
  });
};
