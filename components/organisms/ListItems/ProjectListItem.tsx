import { format } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Tag, Typography } from "@/components";
import { ListItem } from "@/components";
import { ProjectType } from "@/api/entities/types";
import { type Href } from "expo-router";
import { listItemsStyles } from "./styles";

type ProjectListItemProps = {
  item: ProjectType;
  onPress?: () => void;
  href?: Href;
};

export const ProjectListItem = ({
  item,
  onPress,
  href,
}: ProjectListItemProps) => {
  const { name, startDate, dueDate, status, priority } = item;

  const dateRange = `${
    startDate ? format(new Date(startDate), "dd MMM yyyy") : ""
  }${startDate && dueDate ? " - " : ""}${
    dueDate ? format(new Date(dueDate), "dd MMM yyyy") : ""
  }`;

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

        {status || priority ? (
          <View style={listItemsStyles.trailing}>
            {status ? <Tag text={status.name} color={status.color} /> : null}
            {priority ? (
              <Tag text={priority.name} color={priority.color} />
            ) : null}
          </View>
        ) : null}
      </View>
    </ListItem>
  );
};
