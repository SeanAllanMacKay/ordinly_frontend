import { useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useGetProjectStatusesQuery = () => {
  return useQuery({
    queryKey: projectRequestKeys.listProjectStatuses(),
    queryFn: () => projectRequests.listProjectStatuses(),
    select: ({ projectStatuses }) =>
      projectStatuses.map(({ id, name, color }) => ({
        value: id,
        label: name,
        color,
      })),
  });
};
