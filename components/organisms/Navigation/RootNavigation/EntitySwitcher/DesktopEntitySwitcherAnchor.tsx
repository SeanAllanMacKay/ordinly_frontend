import { Card, Icon } from "@/components/atoms";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { EntitySwitcherContext } from "./EntitySwitcherContext";
import { EntitySwitcherItem } from "./EntitySwitcherItem";
import { View } from "react-native";

export const DesktopEntitySwitcherAnchor = () => {
  const { t } = useTranslation("navigation");
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
          variant={selectedEntity.variant}
          name={selectedEntity.name}
          imageURL={selectedEntity.imageURL}
          description={
            selectedEntity.variant === "company"
              ? t("entitySwitcher.company")
              : t("entitySwitcher.personalAccount")
          }
        />

        <Icon name="chevron-down" />
      </View>
    </Card>
  ) : null;
};
