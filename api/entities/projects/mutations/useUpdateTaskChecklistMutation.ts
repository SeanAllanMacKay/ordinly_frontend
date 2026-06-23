import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

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
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.checklist.updateChecklist({
      companyId,
      projectId,
      taskId,
    }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.tasks.checklist.updateChecklist>[0],
        "projectId" | "taskId" | "companyId" | "checklistItemId"
      >,
    ) =>
      await projectRequests.tasks.checklist.updateChecklist({
        ...props,
        companyId: companyId!,
        projectId,
        taskId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ companyId, page: 1 }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ companyId, projectId }),
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
