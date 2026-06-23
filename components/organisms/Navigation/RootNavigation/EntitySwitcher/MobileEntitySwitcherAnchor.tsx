import React, { useContext } from "react";
import { EntitySwitcherAvatar } from "./EntitySwitcherAvatar";
import { EntitySwitcherContext } from "./EntitySwitcherContext";

export const MobileEntitySwitcherAnchor = () => {
  const { selectedEntity } = useContext(EntitySwitcherContext);

  return selectedEntity ? (
    <EntitySwitcherAvatar name={selectedEntity.name} />
  ) : null;
};
