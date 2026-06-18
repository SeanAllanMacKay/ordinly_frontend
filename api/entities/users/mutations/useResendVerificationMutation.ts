import { useMutation } from "@tanstack/react-query";
import { userRequests, userRequestKeys } from "../requests";

export const useResendVerificationMutation = () =>
  useMutation({
    mutationKey: userRequestKeys.resendVerification(),
    mutationFn: userRequests.resendVerification,
  });
