import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequestKeys, projectRequests } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";

export const useGetProjectTasksQuery = ({
  projectId,
  page,
}: {
  projectId: string;
  page: number;
}) => {
  const companyId = useActiveCompanyId();
  const projectRoutes = useProjectRoutes();

  return useQuery({
    queryKey: projectRequestKeys.tasks.listTasks({
      companyId,
      projectId,
      queryParams: { page },
    }),
    queryFn: async () => {
      return await projectRequests.tasks.listTasks({
        companyId: companyId!,
        projectId,
        page,
      });
    },
    enabled: !!companyId,
    select: (response) => {
      return {
        ...response,
        tasks: response?.tasks.map((task) => ({
          ...task,
          href: projectRoutes.tasks.details(projectId, task.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
