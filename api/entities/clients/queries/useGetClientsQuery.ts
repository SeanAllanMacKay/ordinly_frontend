import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { routes } from "@/constants/routes";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetClientsQuery = ({ page }: { page: number }) => {
  const companyId = useActiveCompanyId();

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
          href: routes.manage.company.clients.clientDetails(
            companyId!,
            client.id,
          ),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
