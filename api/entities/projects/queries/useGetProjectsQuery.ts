import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { routes } from "@/constants/routes";

export const useGetProjectsQuery = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: projectRequestKeys.listProjects({ page }),
    queryFn: async () => {
      return await projectRequests.listProjects({ queryParams: { page } });
    },
    select: (response) => {
      return {
        ...response,
        projects: response?.projects.map((project) => ({
          ...project,
          href: routes.manage.projects.projectDetails(project.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
