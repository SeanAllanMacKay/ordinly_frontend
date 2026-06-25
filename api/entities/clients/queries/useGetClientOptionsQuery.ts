import { useQuery } from "@tanstack/react-query";

import { clientRequestKeys, clientRequests } from "../requests";

// Fetches the unpaginated client select options for a company. `companyId` is
// passed in (rather than read from the active route) so the input can be scoped
// to any company.
export const useGetClientOptionsQuery = ({
  companyId,
}: {
  companyId?: string;
}) =>
  useQuery({
    queryKey: clientRequestKeys.listClientOptions({ companyId }),
    queryFn: () => clientRequests.listClientOptions({ companyId: companyId! }),
    enabled: !!companyId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
