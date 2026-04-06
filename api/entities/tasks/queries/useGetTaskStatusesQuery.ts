import { useQuery } from "@tanstack/react-query";
import { taskRequestKeys, taskRequests } from "../requests";

export const useGetTaskStatusesQuery = () => {
  return useQuery({
    queryKey: taskRequestKeys.listTaskStatuses(),
    queryFn: () => taskRequests.listTaskStatuses(),
    select: ({ taskStatuses }) =>
      taskStatuses.map(({ id, name, color }) => ({
        value: id,
        label: name,
        color,
      })),
  });
};
