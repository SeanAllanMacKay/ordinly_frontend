import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateProjectTaskMutation = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.tasks.createTask>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.createTask({ companyId, projectId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.tasks.createTask>[0],
        "projectId" | "companyId"
      >,
    ) =>
      await projectRequests.tasks.createTask({
        ...props,
        companyId: companyId!,
        projectId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.listTasks({
          companyId,
          projectId,
        }),
      });

      onSuccess?.(data);
    },
  });
};
