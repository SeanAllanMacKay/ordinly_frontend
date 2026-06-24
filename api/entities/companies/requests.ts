import { GET, POST, DELETE, REQUEST_ACTIONS } from "@/api/requests";
import { CompanyType } from "../types";

export const companyRequests = {
  createCompany: async (body: { name: string; logo?: string }) =>
    await POST<{ company: CompanyType }>({
      endpoint: "/company",
      body,
    }),
  listCompanies: async ({ queryParams }: { queryParams: { page: number } }) =>
    await GET<{
      page: number;
      totalPages: number;
      pageParam: number;
      companies: CompanyType[];
    }>({
      endpoint: `/company`,
      queryParams,
    }),
  deleteCompany: async ({ companyId }: { companyId: string }) =>
    await DELETE({ endpoint: `/company/${companyId}` }),
};

export const companyRequestKeys = {
  createCompany: () => [REQUEST_ACTIONS.POST, "companies"],
  listCompanies: ({ page }: { page: number }) => [
    REQUEST_ACTIONS.GET,
    "companies",
    "list",
    page,
  ],
  deleteCompany: ({ companyId }: { companyId?: string }) => [
    REQUEST_ACTIONS.DELETE,
    "companies",
    companyId,
  ],
};
