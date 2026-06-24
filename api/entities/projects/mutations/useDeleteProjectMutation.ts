import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useDeleteProjectMutation = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.deleteProject>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.deleteProject({ companyId, projectId }),
    mutationFn: () =>
      projectRequests.deleteProject({ companyId: companyId!, projectId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ companyId }),
      });
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ companyId, projectId }),
      });

      onSuccess?.(data);
    },
  });
};
