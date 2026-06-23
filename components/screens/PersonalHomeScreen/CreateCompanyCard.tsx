import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Button, Card, Icon } from "@/components";
import { Spacing } from "@/styles";
import { useDrawers } from "@/util/navigation/useDrawers";
import { FeatureItem, FeatureList } from "./FeatureList";

const FEATURES: FeatureItem[] = [
  {
    icon: "estimate",
    title: "Real-time communication",
    subtitle: "Never miss a beat with clients, contractors, or your crew",
  },
  {
    icon: "invoice",
    title: "Payments",
    subtitle: "Get paid faster and easier through our payment portal",
  },
  {
    icon: "clients",
    title: "Client management",
    subtitle:
      "Bids, quotes, estimates, invoices, and a dedicated client portal",
  },
  {
    icon: "crew",
    title: "Crew management",
    subtitle:
      "Make sure everyone's working on the right thing at the right time",
  },
];

export const CreateCompanyCard = () => {
  const { open } = useDrawers();
  const theme = useTheme();

  return (
    <Card
      title="Create a company"
      subtitle="Step up to managing bids, invoices, clients, crew, equipment, and much more."
      headerLeft={<Icon name="companies" size="xxl" color="secondary" />}
    >
      <View style={{ gap: Spacing.md }}>
        <FeatureList items={FEATURES} />

        <View style={{ flexDirection: "row" }}>
          <Button
            variant="secondary"
            mode="outlined"
            icon="companies"
            label="Create a company"
            onPress={() => open("add-company")}
          />
        </View>
      </View>
    </Card>
  );
};
