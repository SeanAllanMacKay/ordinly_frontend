import { useInfiniteQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useGetProjectsQuery = () => {
  return useInfiniteQuery({
    queryKey: projectRequestKeys.listProjects(),
    queryFn: ({ pageParam = 1 }) =>
      projectRequests.listProjects({ queryParams: { page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || allPages.length >= lastPage.totalPages) {
        return;
      }

      return lastPage.page + 1;
    },
    getPreviousPageParam: (prevPage) => {
      if (!prevPage || prevPage.page === 1) {
        return;
      }

      return prevPage.page - 1;
    },
  });
};
