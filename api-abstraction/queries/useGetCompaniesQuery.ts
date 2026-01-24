import { models } from "@/api-abstraction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { companyQueryKeys } from "./queryKeys";

import { type CompanyType } from "../models";

export const useGetCompaniesQuery = () =>
  useInfiniteQuery<{
    page: number;
    totalItems: number;
    totalPages: number;
    companies: CompanyType[];
  }>({
    queryKey: companyQueryKeys.root(),
    queryFn: ({ pageParam = 1 }) =>
      models.Company.listCompanies({ page: pageParam }),
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
