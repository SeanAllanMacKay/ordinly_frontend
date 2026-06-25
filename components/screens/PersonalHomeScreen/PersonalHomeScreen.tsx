import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Grid, Screen, Typography } from "@/components";
import { useGetCurrentUserQuery } from "@/api";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { CreateProjectCard } from "./CreateProjectCard";
import { CreateCompanyCard } from "./CreateCompanyCard";
import { Spacing, useWidth } from "@/styles";

export const PersonalHomeScreen = () => {
  const { t } = useTranslation("common");
  const isLarge = useWidth(700);
  const userQuery = useGetCurrentUserQuery();
  const name = userQuery.data?.user?.name;

  return (
    <Screen>
      <View style={{ padding: Spacing.md }}>
        <Grid>
          <View>
            <Typography size="xxl" emphasis="high">
              {t("home.welcome", { suffix: name ? `, ${name}` : "" })}
            </Typography>

            <Typography color="onSurfaceVariant" size="xl">
              {t("home.subtitle")}
            </Typography>
          </View>

          <Grid direction={isLarge ? "horizontal" : "vertical"}>
            <View style={{ flex: 1 }}>
              <CreateProjectCard />
            </View>
            <View style={{ flex: 1 }}>
              <CreateCompanyCard />
            </View>
          </Grid>
        </Grid>
      </View>
    </Screen>
  );
};
