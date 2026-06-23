import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

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
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.editTask({
      companyId,
      projectId,
      taskId,
    }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.tasks.editTask>[0],
        "projectId" | "taskId" | "companyId"
      >,
    ) =>
      await projectRequests.tasks.editTask({
        ...props,
        companyId: companyId!,
        projectId,
        taskId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ companyId }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ companyId, projectId }),
      });

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
