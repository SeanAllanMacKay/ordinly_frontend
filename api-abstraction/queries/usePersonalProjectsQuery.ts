import { models } from "@/api-abstraction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { projectQueryKeys } from "./queryKeys";

import { type ProjectType } from "../models";

export const usePersonalProjectsQuery = () =>
  useInfiniteQuery<{
    page: number;
    totalItems: number;
    totalPages: number;
    projects: ProjectType[];
  }>({
    queryKey: projectQueryKeys.personalProjects(),
    queryFn: ({ pageParam = 1 }) =>
      models.Project.listProjects({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages?.length >= lastPage.totalPages) {
        return;
      }

      return lastPage.page + 1;
    },
    getPreviousPageParam: (prevPage) => {
      if (prevPage.page === 1) {
        return;
      }

      return prevPage.page - 1;
    },
  });
