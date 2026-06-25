import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Button, Card, Icon, Tag } from "@/components";
import { Spacing } from "@/styles";
import { useDrawers } from "@/util/navigation/useDrawers";
import { FeatureItem, FeatureList } from "./FeatureList";

export const CreateProjectCard = () => {
  const { t } = useTranslation("common");
  const { open } = useDrawers();
  const theme = useTheme();

  const features: FeatureItem[] = [
    {
      icon: "tasks",
      title: t("home.project.features.scheduleTitle"),
      subtitle: t("home.project.features.scheduleSubtitle"),
    },
    {
      icon: "clock",
      title: t("home.project.features.timeTitle"),
      subtitle: t("home.project.features.timeSubtitle"),
    },
    {
      icon: "image",
      title: t("home.project.features.filesTitle"),
      subtitle: t("home.project.features.filesSubtitle"),
    },
    {
      icon: "portfolio",
      title: t("home.project.features.portfolioTitle"),
      subtitle: t("home.project.features.portfolioSubtitle"),
    },
  ];

  return (
    <Card
      emphasis="high"
      title={t("home.project.title")}
      subtitle={t("home.project.subtitle")}
      headerLeft={<Icon name="projects" size="xxl" color="secondary" />}
    >
      <View style={{ gap: Spacing.md }}>
        <FeatureList items={features} />

        <View style={{ flexDirection: "row" }}>
          <Button
            variant="primary"
            mode="contained"
            icon="plus"
            label={t("home.project.cta")}
            onPress={() => open("add-project")}
          />
        </View>
      </View>
    </Card>
  );
};
