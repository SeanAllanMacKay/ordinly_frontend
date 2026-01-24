import { ProjectType } from "@/api-abstraction/models";
import React from "react";
import { Card } from "@/components";

type CompanyCardProps = {
  item: ProjectType;
  onPress?: () => void;
  href?: string;
};

export const CompanyCard = ({
  item: { name, description },
  href,
  onPress,
}: CompanyCardProps) => {
  return (
    <Card
      title={name}
      subtitle={description}
      onPress={onPress}
      href={href}
    ></Card>
  );
};
