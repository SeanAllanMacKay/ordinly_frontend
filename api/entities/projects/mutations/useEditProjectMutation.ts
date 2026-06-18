import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useEditProjectMutation = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.editProject>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectRequestKeys.editproject({ projectId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.editProject>[0],
        "projectId"
      >,
    ) => await projectRequests.editProject({ ...props, projectId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ projectId }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects(),
      });

      onSuccess?.(data);
    },
  });
};
