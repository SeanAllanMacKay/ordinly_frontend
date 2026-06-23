import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { routes } from "@/constants/routes";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetProjectsQuery = ({ page }: { page: number }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: projectRequestKeys.listProjects({ companyId, page }),
    queryFn: async () => {
      return await projectRequests.listProjects({
        companyId: companyId!,
        queryParams: { page },
      });
    },
    enabled: !!companyId,
    select: (response) => {
      return {
        ...response,
        projects: response?.projects.map((project) => ({
          ...project,
          href: routes.manage.personal.projects.projectDetails(project.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
