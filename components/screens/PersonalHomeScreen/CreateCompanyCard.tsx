import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Button, Card, Icon } from "@/components";
import { Spacing } from "@/styles";
import { useDrawers } from "@/util/navigation/useDrawers";
import { FeatureItem, FeatureList } from "./FeatureList";

export const CreateCompanyCard = () => {
  const { t } = useTranslation("common");
  const { open } = useDrawers();
  const theme = useTheme();

  const features: FeatureItem[] = [
    {
      icon: "estimate",
      title: t("home.company.features.communicationTitle"),
      subtitle: t("home.company.features.communicationSubtitle"),
    },
    {
      icon: "invoice",
      title: t("home.company.features.paymentsTitle"),
      subtitle: t("home.company.features.paymentsSubtitle"),
    },
    {
      icon: "clients",
      title: t("home.company.features.clientsTitle"),
      subtitle: t("home.company.features.clientsSubtitle"),
    },
    {
      icon: "crew",
      title: t("home.company.features.crewTitle"),
      subtitle: t("home.company.features.crewSubtitle"),
    },
  ];

  return (
    <Card
      title={t("home.company.title")}
      subtitle={t("home.company.subtitle")}
      headerLeft={<Icon name="companies" size="xxl" color="secondary" />}
    >
      <View style={{ gap: Spacing.md }}>
        <FeatureList items={features} />

        <View style={{ flexDirection: "row" }}>
          <Button
            variant="secondary"
            mode="outlined"
            icon="companies"
            label={t("home.company.cta")}
            onPress={() => open("add-company")}
          />
        </View>
      </View>
    </Card>
  );
};
