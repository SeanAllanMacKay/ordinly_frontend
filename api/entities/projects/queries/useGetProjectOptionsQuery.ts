import { useQuery } from "@tanstack/react-query";

import { projectRequestKeys, projectRequests } from "../requests";

// Fetches the unpaginated project select options for a company.
export const useGetProjectOptionsQuery = ({
  companyId,
}: {
  companyId?: string;
}) =>
  useQuery({
    queryKey: projectRequestKeys.listProjectOptions({ companyId }),
    queryFn: () => projectRequests.listProjectOptions({ companyId: companyId! }),
    enabled: !!companyId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
