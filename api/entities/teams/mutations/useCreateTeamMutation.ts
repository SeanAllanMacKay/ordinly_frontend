import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamRequests, teamRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateTeamMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof teamRequests.createTeam>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: teamRequestKeys.createTeam({ companyId }),
    mutationFn: (
      body: Omit<Parameters<typeof teamRequests.createTeam>[0], "companyId">,
    ) => teamRequests.createTeam({ ...body, companyId: companyId! }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: teamRequestKeys.listTeams({ companyId }),
      });

      onSuccess?.(data);
    },
  });
};
