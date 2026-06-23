import { useIsPhone } from "@/styles";
import { EntitySwitcherMenu } from "./EntitySwitcherMenu";
import { MobileEntitySwitcherAnchor } from "./MobileEntitySwitcherAnchor";
import { DesktopEntitySwitcherAnchor } from "./DesktopEntitySwitcherAnchor";
import React, { useContext } from "react";
import {
  EntitySwitcherContext,
  EntitySwitcherProvider,
} from "./EntitySwitcherContext";

export const EntitySwitcherContent = () => {
  const { selectedEntity } = useContext(EntitySwitcherContext);

  const isPhone = useIsPhone();

  return selectedEntity ? (
    <EntitySwitcherMenu
      anchor={
        isPhone ? (
          <MobileEntitySwitcherAnchor />
        ) : (
          <DesktopEntitySwitcherAnchor />
        )
      }
    />
  ) : null;
};

export const EntitySwitcher = () => {
  return (
    <EntitySwitcherProvider>
      <EntitySwitcherContent />
    </EntitySwitcherProvider>
  );
};
