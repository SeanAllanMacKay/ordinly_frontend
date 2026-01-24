import { useMutation } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useVerifyAccountMutation = () =>
  useMutation({
    mutationKey: userRequestKeys.verifyAccount(),
    mutationFn: userRequests.verifyAccount,
  });
