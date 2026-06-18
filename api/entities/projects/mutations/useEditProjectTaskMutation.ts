import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useEditProjectTaskMutation = ({
  projectId,
  taskId,
  onSuccess,
}: {
  projectId: string;
  taskId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.tasks.editTask>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.editTask({ projectId, taskId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.tasks.editTask>[0],
        "projectId" | "taskId"
      >,
    ) => await projectRequests.tasks.editTask({ ...props, projectId, taskId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects(),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ projectId }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.listTasks({ projectId }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.getTask({ projectId, taskId }),
      });

      onSuccess?.(data);
    },
  });
};
