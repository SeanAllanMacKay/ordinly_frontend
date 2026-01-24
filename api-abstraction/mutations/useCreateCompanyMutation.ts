import { useMutation } from "@tanstack/react-query";
import { models } from "..";

export const useCreateCompanyMutation = ({
  onSuccess: onSuccessCallback,
}: {
  onSuccess?: (
    user: Awaited<ReturnType<typeof models.Company.createCompany>>["company"]
  ) => void;
} = {}) =>
  useMutation({
    mutationFn: models.Company.createCompany,
    onSuccess: ({ company }) => {
      onSuccessCallback?.(company);
    },
  });
