import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useUpdateTaskChecklistMutation = ({
  projectId,
  taskId,
  onSuccess,
}: {
  projectId: string;
  taskId: string;
  onSuccess?: (
    data: Awaited<
      ReturnType<typeof projectRequests.tasks.checklist.updateChecklist>
    >,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.checklist.updateChecklist({
      projectId,
      taskId,
    }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.tasks.checklist.updateChecklist>[0],
        "projectId" | "taskId" | "checklistItemId"
      >,
    ) =>
      await projectRequests.tasks.checklist.updateChecklist({
        ...props,
        projectId,
        taskId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ page: 1 }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ projectId }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.getTask({ projectId, taskId }),
      });

      onSuccess?.(data);
    },
  });
};
