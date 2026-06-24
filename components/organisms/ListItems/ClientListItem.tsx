import React from "react";
import { View } from "react-native";
import { Typography } from "@/components";
import { ListItem } from "@/components";
import { ClientType } from "@/api/entities/types";
import { type Href } from "expo-router";
import { listItemsStyles } from "./styles";

type ClientListItemProps = {
  item: ClientType;
  onPress?: () => void;
  href?: Href;
};

export const ClientListItem = ({
  item,
  onPress,
  href,
}: ClientListItemProps) => {
  const { name, description } = item;

  return (
    <ListItem onPress={onPress} href={href}>
      <View style={listItemsStyles.row}>
        <View style={listItemsStyles.content}>
          <Typography emphasis="high" canWrap={false}>
            {name}
          </Typography>
          {description ? (
            <Typography size="sm" emphasis="low" color="onSurfaceVariant">
              {description}
            </Typography>
          ) : null}
        </View>
      </View>
    </ListItem>
  );
};
