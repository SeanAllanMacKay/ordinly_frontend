import { requests } from "../";

export type CompanyType = {
  name: string;
  description: string;
};

export const Company = {
  createCompany: async (body: { name: string; description: string }) =>
    await requests.POST<{ company: CompanyType }>({
      endpoint: "/company",
      body,
    }),
  listCompanies: async ({ page }: { page: number }) =>
    await requests.GET<{
      page: number;
      totalPages: number;
      pageParam: number;
      companies: CompanyType[];
    }>({
      endpoint: `/company`,
      queryParams: {
        page,
      },
    }),
  getCompany: async () => {},
  updateCompany: async () => {},
  deleteCompany: async () => {},
};
