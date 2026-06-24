import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";

export const useGetProjectsQuery = ({ page }: { page: number }) => {
  const companyId = useActiveCompanyId();
  const projectRoutes = useProjectRoutes();

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
          href: projectRoutes.projectDetails(project.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
