import { useQuery } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetClientContactQuery = ({
  clientId,
  contactId,
}: {
  clientId: string;
  contactId: string;
}) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: clientRequestKeys.contacts.getContact({
      companyId,
      clientId,
      contactId,
    }),
    queryFn: () =>
      clientRequests.contacts.getContact({
        companyId: companyId!,
        clientId,
        contactId,
      }),
    enabled: !!companyId && !!clientId && !!contactId,
  });
};
