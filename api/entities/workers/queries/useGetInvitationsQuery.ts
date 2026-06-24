import { useQuery } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetInvitationsQuery = () => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: workerRequestKeys.invitations.listInvitations({ companyId }),
    queryFn: async () => {
      return await workerRequests.invitations.listInvitations({
        companyId: companyId!,
      });
    },
    enabled: !!companyId,
    retry: false,
  });
};
