import { ProjectType } from "@/api-abstraction/models";
import { format } from "date-fns";
import React from "react";
import { Tag, Card } from "@/components";
import { View } from "react-native";
import { Spacing } from "@/constants/Spacing";

type ProjectCardProps = {
  item: ProjectType;
  onPress?: () => void;
  href?: string;
};

export const ProjectCard = ({
  item: { _id, name, startDate, dueDate, status, priority },
  href,
  onPress,
}: ProjectCardProps) => {
  return (
    <Card
      title={name}
      subtitle={`${
        startDate ? format(new Date(startDate), "dd MMM yyyy") : ""
      }${startDate && dueDate ? " - " : ""}${
        dueDate ? format(new Date(dueDate), "dd MMM yyyy") : ""
      }`}
      onPress={onPress}
      href={href}
    >
      {status || priority ? (
        <View style={{ display: "flex", flexDirection: "row", gap: Spacing.s }}>
          {status ? <Tag variant={status} /> : null}

          {priority ? <Tag variant={priority} /> : null}
        </View>
      ) : null}
    </Card>
  );
};
