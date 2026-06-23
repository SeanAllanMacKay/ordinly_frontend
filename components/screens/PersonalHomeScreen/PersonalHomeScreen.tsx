import React from "react";
import { View } from "react-native";
import { Grid, Screen, Typography } from "@/components";
import { useGetCurrentUserQuery } from "@/api";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { CreateProjectCard } from "./CreateProjectCard";
import { CreateCompanyCard } from "./CreateCompanyCard";
import { Spacing, useWidth } from "@/styles";

export const PersonalHomeScreen = () => {
  const isLarge = useWidth(700);
  const userQuery = useGetCurrentUserQuery();
  const name = userQuery.data?.user?.name;

  return (
    <Screen>
      <View style={{ padding: Spacing.md }}>
        <Grid>
          <View>
            <Typography size="xxl" emphasis="high">
              {`Welcome to Ordinly${name ? `, ${name}` : ""}`}
            </Typography>

            <Typography color="onSurfaceVariant" size="xl">
              Pick a place to start.
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
