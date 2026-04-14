import { format } from "date-fns";
import React from "react";
import { Tag, Card } from "@/components";
import { Image, View } from "react-native";
import { Spacing } from "@/styles";
import { CompanyType } from "@/api";

type CompanyCardProps = {
  item: CompanyType;
  onPress?: () => void;
  href?: string;
};

export const CompanyCard = ({
  item: { name, logo },
  onPress,
}: CompanyCardProps) => {
  console.log(logo);
  return (
    <Card
      title={name}
      onPress={onPress}
      headerLeft={
        logo ? (
          <Image
            source={{ uri: logo.externalURL }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
            }}
          />
        ) : undefined
      }
    ></Card>
  );
};
