import { useQuery } from "@tanstack/react-query";

import { teamRequestKeys, teamRequests } from "../requests";

// Fetches the unpaginated team select options for a company.
export const useGetTeamOptionsQuery = ({
  companyId,
}: {
  companyId?: string;
}) =>
  useQuery({
    queryKey: teamRequestKeys.listTeamOptions({ companyId }),
    queryFn: () => teamRequests.listTeamOptions({ companyId: companyId! }),
    enabled: !!companyId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
