import React from "react";
import { View } from "react-native";
import { Image, Typography } from "@/components";
import { ListItem } from "@/components";
import { CompanyType } from "@/api/entities/types";
import { type Href } from "expo-router";
import { listItemsStyles } from "./styles";

type CompanyListItemProps = {
  item: CompanyType;
  onPress?: () => void;
  href?: Href;
};

export const CompanyListItem = ({
  item,
  onPress,
  href,
}: CompanyListItemProps) => {
  const { name, logo, owner } = item;

  return (
    <ListItem onPress={onPress} href={href}>
      <View style={listItemsStyles.row}>
        {logo ? (
          <Image
            source={{ uri: logo.externalURL }}
            variant="company-logo"
            size="sm"
          />
        ) : null}

        <View style={listItemsStyles.content}>
          <Typography emphasis="high" canWrap={false}>
            {name}
          </Typography>
          {owner?.name ? (
            <Typography size="sm" emphasis="low" color="onSurfaceVariant">
              {owner.name}
            </Typography>
          ) : null}
        </View>
      </View>
    </ListItem>
  );
};
