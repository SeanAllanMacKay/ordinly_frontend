import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Screen } from "@/components";
import { Card } from "@/components";
import { Grid } from "@/components/Grid/Grid";

export default function Account() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Account" });
  }, [navigation]);

  return (
    <Screen>
      <Grid>
        <Card title="Details"></Card>
      </Grid>
    </Screen>
  );
}
