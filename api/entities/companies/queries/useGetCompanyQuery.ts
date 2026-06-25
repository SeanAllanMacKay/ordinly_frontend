import { useQuery } from "@tanstack/react-query";
import { companyRequests, companyRequestKeys } from "../requests";

export const useGetCompanyQuery = ({ companyId }: { companyId?: string }) => {
  return useQuery({
    queryKey: companyRequestKeys.getCompany({ companyId }),
    queryFn: () => companyRequests.getCompany({ companyId: companyId! }),
    enabled: !!companyId,
  });
};
