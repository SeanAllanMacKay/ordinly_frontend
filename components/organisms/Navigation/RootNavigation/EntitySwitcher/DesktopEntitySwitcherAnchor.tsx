import { Card, Icon } from "@/components/atoms";
import React, { useContext } from "react";
import { EntitySwitcherContext } from "./EntitySwitcherContext";
import { EntitySwitcherItem } from "./EntitySwitcherItem";
import { View } from "react-native";

export const DesktopEntitySwitcherAnchor = () => {
  const { selectedEntity } = useContext(EntitySwitcherContext);

  return selectedEntity ? (
    <Card>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EntitySwitcherItem
          name={selectedEntity.name}
          description={
            selectedEntity.variant === "company"
              ? "Company"
              : "Personal account"
          }
        />

        <Icon name="chevron-down" />
      </View>
    </Card>
  ) : null;
};
