import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useResendVerificationMutation } from "@/api";
import { verificationBannerStyles } from "./styles";
import { useShowVerificationBanner } from "./useShowVerificationBanner";
import { Button, Icon, Typography } from "@/components/atoms";
import { Spacing } from "@/styles";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { ThemeScope } from "@/styles/ThemeScope";

/**
 * Persistent banner shown across authenticated screens while the signed-in
 * user has not yet verified their account. Renders nothing once the user is
 * verified (or before the current-user query resolves).
 */
export const VerificationBannerContent = () => {
  const { top } = useSafeAreaInsets();

  const isPhone = useIsPhone();

  const showBanner = useShowVerificationBanner();
  const resendMutation = useResendVerificationMutation();

  if (!showBanner) {
    return null;
  }

  const actionLabel = resendMutation.isSuccess
    ? "Email sent"
    : resendMutation.isPending
      ? "Sending…"
      : "Resend email";

  return (
    <View
      style={[
        verificationBannerStyles.container,
        {
          backgroundColor: "white",
          paddingTop: top,
          justifyContent: isPhone ? "center" : "flex-start",
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          gap: Spacing.md,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.md,
          }}
        >
          <Icon name="warning" size="xl" color="tertiary" />

          <Typography canWrap color="outline" size="sm">
            Your account isn&apos;t verified yet.
          </Typography>
        </View>

        <Button
          label={actionLabel}
          onPress={() => resendMutation.mutate()}
          isLoading={resendMutation.isPending}
          isDisabled={resendMutation.isPending || resendMutation.isSuccess}
        />
      </View>
    </View>
  );
};

export const VerificationBanner = () => {
  return (
    <ThemeScope scheme="light">
      <VerificationBannerContent />
    </ThemeScope>
  );
};
