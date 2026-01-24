import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectRequestKeys.createProject(),
    mutationFn: projectRequests.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects(),
      });
    },
  });
};
