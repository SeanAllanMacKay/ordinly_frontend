import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateProjectMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.createProject>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.createProject({ companyId }),
    mutationFn: (
      body: Omit<Parameters<typeof projectRequests.createProject>[0], "companyId">,
    ) => projectRequests.createProject({ ...body, companyId: companyId! }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ companyId, page: 1 }),
      });

      onSuccess?.(data);
    },
  });
};
