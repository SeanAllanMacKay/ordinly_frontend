import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequestKeys, projectRequests } from "../requests";
import { routes } from "@/constants/routes";

export const useGetProjectTaskQuery = ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) => {
  return useQuery({
    queryKey: projectRequestKeys.tasks.getTask({
      projectId,
      taskId,
    }),
    queryFn: async () => {
      return await projectRequests.tasks.getTask({
        projectId,
        taskId,
      });
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
