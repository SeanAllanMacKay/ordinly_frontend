import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateProjectPhaseMutation = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.phases.createPhase>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.phases.createPhase({ companyId, projectId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.phases.createPhase>[0],
        "projectId" | "companyId"
      >,
    ) =>
      await projectRequests.phases.createPhase({
        ...props,
        companyId: companyId!,
        projectId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.phases.listPhaseOptions({
          companyId,
          projectId,
        }),
      });
      // Phases also surface in the project's task list, so refresh it too.
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.listTasks({ companyId, projectId }),
      });

      onSuccess?.(data);
    },
  });
};
