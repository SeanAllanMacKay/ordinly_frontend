import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Button, Card, Icon, Tag } from "@/components";
import { Spacing } from "@/styles";
import { useDrawers } from "@/util/navigation/useDrawers";
import { FeatureItem, FeatureList } from "./FeatureList";

const FEATURES: FeatureItem[] = [
  {
    icon: "tasks",
    title: "Schedule",
    subtitle: "Break your project into tasks, phases, and milestones",
  },
  { icon: "clock", title: "Time tracking", subtitle: "Log hours on site" },
  {
    icon: "image",
    title: "Images & files",
    subtitle: "Keep your contracts, waivers, and proof of work in one place",
  },
  {
    icon: "portfolio",
    title: "Portfolio",
    subtitle: "Show your best work to get more jobs",
  },
];

export const CreateProjectCard = () => {
  const { open } = useDrawers();
  const theme = useTheme();

  return (
    <Card
      emphasis="high"
      title="Create your first project"
      subtitle="Track tasks, time, and photos for personal jobs, side work, and your professional portfolio."
      headerLeft={<Icon name="projects" size="xxl" color="secondary" />}
    >
      <View style={{ gap: Spacing.md }}>
        <FeatureList items={FEATURES} />

        <View style={{ flexDirection: "row" }}>
          <Button
            variant="primary"
            mode="contained"
            icon="plus"
            label="Create a project"
            onPress={() => open("add-project")}
          />
        </View>
      </View>
    </Card>
  );
};
