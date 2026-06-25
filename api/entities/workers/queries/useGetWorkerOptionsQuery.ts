import { useQuery } from "@tanstack/react-query";

import { workerRequestKeys, workerRequests } from "../requests";

// Fetches the unpaginated worker (company member) select options. Maps to the BE
// `/users/options` endpoint; see the naming note in `workers/requests.ts`.
export const useGetWorkerOptionsQuery = ({
  companyId,
}: {
  companyId?: string;
}) =>
  useQuery({
    queryKey: workerRequestKeys.listWorkerOptions({ companyId }),
    queryFn: () => workerRequests.listWorkerOptions({ companyId: companyId! }),
    enabled: !!companyId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
