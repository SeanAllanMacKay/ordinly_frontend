import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { appHeaderStyles } from "./styles";
import { Typography } from "@/components/atoms/Typography";
import { EntitySwitcher } from "./EntitySwitcher";
import { useShowVerificationBanner } from "@/components/organisms/VerificationBanner";
import { Spacing } from "@/styles";

export const AppHeader = () => {
  const { top } = useSafeAreaInsets();

  // The verification banner sits above this header and already consumes the top
  // safe-area inset when shown, so avoid double-padding in that case.
  const showBanner = useShowVerificationBanner();

  return (
    <>
      <View
        style={[
          appHeaderStyles.appHeader,
          Platform.select({
            default: {
              paddingTop: showBanner ? Spacing.sm : top,
              paddingHorizontal: Spacing.md,
              paddingBottom: Spacing.sm,
            },
            web: {
              paddingVertical: Spacing.md,
              paddingHorizontal: Spacing.md,
            },
          }),
        ]}
      >
        <Typography
          colorOverride="#ffffff"
          emphasis="high"
          size={Platform.select({ default: "md", web: "lg" })}
        >
          Ordinly
        </Typography>
      </View>
    </>
  );
};
