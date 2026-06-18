import { format } from "date-fns";
import React from "react";
import { Tag, Card, Image, EnrichedTypography } from "@/components";
import { View } from "react-native";
import { Spacing } from "@/styles";
import { CompanyType } from "@/api";

type CompanyCardProps = {
  item: CompanyType;
  onPress?: () => void;
  href?: string;
};

export const CompanyCard = ({
  item: { name, logo, description },
  onPress,
}: CompanyCardProps) => {
  return (
    <Card
      title={name}
      onPress={onPress}
      headerLeft={
        logo ? (
          <Image
            source={{ uri: logo.externalURL }}
            variant="company-logo"
            size="sm"
          />
        ) : undefined
      }
    >
      <EnrichedTypography text={description} />
    </Card>
  );
};
