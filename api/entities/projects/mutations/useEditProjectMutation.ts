import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

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
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: projectRequestKeys.editproject({ companyId, projectId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.editProject>[0],
        "projectId" | "companyId"
      >,
    ) =>
      await projectRequests.editProject({
        ...props,
        companyId: companyId!,
        projectId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.getProject({ companyId, projectId }),
      });

      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.listProjects({ companyId }),
      });

      onSuccess?.(data);
    },
  });
};
