import { useQuery } from "@tanstack/react-query";

import { clientRequestKeys, clientRequests } from "../requests";

// Contact options are scoped to a client, so the query stays disabled until both
// `companyId` and `clientId` are available.
export const useGetContactOptionsQuery = ({
  companyId,
  clientId,
}: {
  companyId?: string;
  clientId?: string;
}) =>
  useQuery({
    queryKey: clientRequestKeys.contacts.listContactOptions({
      companyId,
      clientId,
    }),
    queryFn: () =>
      clientRequests.contacts.listContactOptions({
        companyId: companyId!,
        clientId: clientId!,
      }),
    enabled: !!companyId && !!clientId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
