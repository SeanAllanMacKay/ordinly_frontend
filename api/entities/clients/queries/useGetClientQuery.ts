import { useQuery } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetClientQuery = ({ clientId }: { clientId: string }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: clientRequestKeys.getClient({ companyId, clientId }),
    queryFn: () =>
      clientRequests.getClient({ companyId: companyId!, clientId }),
    enabled: !!companyId && !!clientId,
  });
};
