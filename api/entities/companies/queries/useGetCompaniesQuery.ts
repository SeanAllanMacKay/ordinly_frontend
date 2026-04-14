import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { companyRequests, companyRequestKeys } from "../requests";
import { routes } from "@/constants/routes";

export const useGetCompaniesQuery = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: companyRequestKeys.listCompanies({ page }),
    queryFn: async () => {
      return await companyRequests.listCompanies({ queryParams: { page } });
    },
    select: (response) => {
      return {
        ...response,
        companies: response?.companies.map((company) => ({
          ...company,
          href: routes.manage.company.root(company.id),
        })),
      };
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
};
