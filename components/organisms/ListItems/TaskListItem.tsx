import { format } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Tag, Typography } from "@/components";
import { ListItem } from "@/components";
import { TaskType } from "@/api/entities/types";
import { type Href } from "expo-router";
import { listItemsStyles } from "./styles";

type TaskListItemProps = {
  item: TaskType;
  onPress?: () => void;
  href?: Href;
};

export const TaskListItem = ({ item, onPress, href }: TaskListItemProps) => {
  const { name, startDate, dueDate, status, priority, checklist } = item;

  const dateRange = `${
    startDate ? format(new Date(startDate), "dd MMM yyyy") : ""
  }${startDate && dueDate ? " - " : ""}${
    dueDate ? format(new Date(dueDate), "dd MMM yyyy") : ""
  }`;

  const completeItemsLength = checklist?.reduce(
    (acc, checklistItem) => (checklistItem.isComplete ? acc + 1 : acc),
    0,
  );

  return (
    <ListItem onPress={onPress} href={href}>
      <View style={listItemsStyles.row}>
        <View style={listItemsStyles.content}>
          <Typography emphasis="high" canWrap={false}>
            {name}
          </Typography>
          {dateRange ? (
            <Typography size="sm" emphasis="low" color="onSurfaceVariant">
              {dateRange}
            </Typography>
          ) : null}
        </View>

        <View style={listItemsStyles.trailing}>
          {status ? <Tag text={status.name} color={status.color} /> : null}
          {priority ? (
            <Tag text={priority.name} color={priority.color} />
          ) : null}
          {checklist.length ? (
            <Typography size="sm" color="onSurfaceVariant">
              {`${completeItemsLength}/${checklist.length}`}
            </Typography>
          ) : null}
        </View>
      </View>
    </ListItem>
  );
};
