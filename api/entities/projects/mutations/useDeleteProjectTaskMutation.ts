import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useDeleteProjectTaskMutation = ({
  projectId,
  taskId,
  onSuccess,
}: {
  projectId: string;
  taskId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.tasks.deleteTask>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.deleteTask({
      companyId,
      projectId,
      taskId,
    }),
    mutationFn: () =>
      projectRequests.tasks.deleteTask({
        companyId: companyId!,
        projectId,
        taskId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.listTasks({ companyId, projectId }),
      });
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.getTask({
          companyId,
          projectId,
          taskId,
        }),
      });

      onSuccess?.(data);
    },
  });
};
