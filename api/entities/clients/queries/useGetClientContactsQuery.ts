import { useQuery } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetClientContactsQuery = ({
  clientId,
}: {
  clientId: string;
}) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: clientRequestKeys.contacts.listContacts({ companyId, clientId }),
    queryFn: () =>
      clientRequests.contacts.listContacts({ companyId: companyId!, clientId }),
    enabled: !!companyId && !!clientId,
  });
};
