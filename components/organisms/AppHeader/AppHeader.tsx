import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { appHeaderStyles } from "./styles";
import { Typography } from "@/components/atoms/Typography";
import { EntitySwitcher } from "./EntitySwitcher";
import { Spacing } from "@/styles";

export const AppHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          appHeaderStyles.appHeader,
          Platform.select({
            default: {
              paddingTop: top,
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

        <View>
          <EntitySwitcher />
        </View>
      </View>
    </>
  );
};
