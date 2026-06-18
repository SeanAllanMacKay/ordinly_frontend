import { useGetCurrentUserQuery } from "@/api";

/**
 * Whether the unverified-account banner should be shown: a signed-in user
 * exists and has not yet verified their account. Shared by `VerificationBanner`
 * (to render) and `AppHeader` (to avoid double-applying the top safe-area inset
 * the banner already owns when it sits above the header).
 */
export const useShowVerificationBanner = () => {
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user;

  return !!user && !user.isVerified;
};
