import { useQuery } from "@tanstack/react-query";
import { taskRequestKeys, taskRequests } from "../requests";

export const useGetTaskPrioritiesQuery = () => {
  return useQuery({
    queryKey: taskRequestKeys.listTaskPriorities(),
    queryFn: () => taskRequests.listTaskPriorities(),
    select: ({ taskPriorities }) =>
      taskPriorities.map(({ id, name, color }) => ({
        value: id,
        label: name,
        color,
      })),
  });
};
