import { useQuery } from "@tanstack/react-query";

import { projectRequestKeys, projectRequests } from "../requests";

// Phase options are scoped to a project, so the query stays disabled until both
// `companyId` and `projectId` are available.
export const useGetPhaseOptionsQuery = ({
  companyId,
  projectId,
}: {
  companyId?: string;
  projectId?: string;
}) =>
  useQuery({
    queryKey: projectRequestKeys.phases.listPhaseOptions({
      companyId,
      projectId,
    }),
    queryFn: () =>
      projectRequests.phases.listPhaseOptions({
        companyId: companyId!,
        projectId: projectId!,
      }),
    enabled: !!companyId && !!projectId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
