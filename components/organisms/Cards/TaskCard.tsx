import { format } from "date-fns";
import React from "react";
import { Tag, Card, Typography } from "@/components";
import { View } from "react-native";
import { Spacing } from "@/styles";
import { TaskType } from "@/api/entities/projects/requests";

type TaskCardProps = {
  item: TaskType;
  onPress?: () => void;
  href?: string;
};

export const TaskCard = ({
  item: { name, startDate, dueDate, status, priority, checklist },
  onPress,
}: TaskCardProps) => {
  const completeItemsLength = checklist?.reduce((acc, item) => {
    if (item.isComplete) {
      acc++;
    }

    return acc;
  }, 0);

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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

        {checklist.length ? (
          <Typography>{`${completeItemsLength}/${checklist.length}`}</Typography>
        ) : null}
      </View>
    </Card>
  );
};
