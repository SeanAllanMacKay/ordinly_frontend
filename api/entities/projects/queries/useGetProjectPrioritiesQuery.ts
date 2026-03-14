import { useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useGetProjectPrioritiesQuery = () => {
  return useQuery({
    queryKey: projectRequestKeys.listProjectPriorities(),
    queryFn: () => projectRequests.listProjectPriorities(),
    select: ({ projectPriorities }) =>
      projectPriorities.map(({ id, name, color }) => ({
        value: id,
        label: name,
        color,
      })),
  });
};
