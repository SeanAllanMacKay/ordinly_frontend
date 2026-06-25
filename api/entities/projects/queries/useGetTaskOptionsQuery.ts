import { useQuery } from "@tanstack/react-query";

import { projectRequestKeys, projectRequests } from "../requests";

// Task options are scoped to a project, so the query stays disabled until both
// `companyId` and `projectId` are available.
export const useGetTaskOptionsQuery = ({
  companyId,
  projectId,
}: {
  companyId?: string;
  projectId?: string;
}) =>
  useQuery({
    queryKey: projectRequestKeys.tasks.listTaskOptions({ companyId, projectId }),
    queryFn: () =>
      projectRequests.tasks.listTaskOptions({
        companyId: companyId!,
        projectId: projectId!,
      }),
    enabled: !!companyId && !!projectId,
    select: ({ options }) =>
      options.map(({ value, label }) => ({ value, label: label ?? "" })),
  });
