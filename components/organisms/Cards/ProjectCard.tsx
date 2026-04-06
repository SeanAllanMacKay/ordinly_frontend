import { format } from "date-fns";
import React from "react";
import { Tag, Card } from "@/components";
import { View } from "react-native";
import { Spacing } from "@/styles";
import { ProjectType } from "@/api/entities/projects/requests";

type ProjectCardProps = {
  item: ProjectType;
  onPress?: () => void;
  href?: string;
};

export const ProjectCard = ({
  item: { name, startDate, dueDate, status, priority },
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
    >
      {status || priority ? (
        <View
          style={{ display: "flex", flexDirection: "row", gap: Spacing.sm }}
        >
          {status ? (
            <Tag
              variant={status.name}
              text={status.name}
              color={status.color}
            />
          ) : null}

          {priority ? (
            <Tag
              variant={priority.name}
              text={priority.name}
              color={priority.color}
            />
          ) : null}
        </View>
      ) : null}
    </Card>
  );
};
