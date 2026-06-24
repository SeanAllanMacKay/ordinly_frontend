import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";
import { useClientRoutes } from "@/util/navigation/useClientRoutes";

export const useGetClientsQuery = ({ page }: { page: number }) => {
  const companyId = useActiveCompanyId();
  const clientRoutes = useClientRoutes();

  return useQuery({
    queryKey: clientRequestKeys.listClients({ companyId, page }),
    queryFn: async () => {
      return await clientRequests.listClients({
        companyId: companyId!,
        queryParams: { page },
      });
    },
    enabled: !!companyId,
    select: (response) => {
      return {
        ...response,
        clients: response?.clients.map((client) => ({
          ...client,
          href: clientRoutes.clientDetails(client.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
