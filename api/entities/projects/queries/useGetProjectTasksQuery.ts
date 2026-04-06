import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequestKeys, projectRequests } from "../requests";
import { routes } from "@/constants/routes";

export const useGetProjectTasksQuery = ({
  projectId,
  page,
}: {
  projectId: string;
  page: number;
}) => {
  return useQuery({
    queryKey: projectRequestKeys.tasks.listTasks({
      projectId,
      queryParams: { page },
    }),
    queryFn: async () => {
      return await projectRequests.tasks.listTasks({
        projectId,
        page,
      });
    },
    select: (response) => {
      return {
        ...response,
        tasks: response?.tasks.map((task) => ({
          ...task,
          href: routes.manage.projects.tasks.details(projectId, task.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
