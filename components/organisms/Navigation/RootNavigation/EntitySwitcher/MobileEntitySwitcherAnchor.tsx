import React, { useContext } from "react";
import { EntitySwitcherContext } from "./EntitySwitcherContext";
import { CompanyAvatar, UserAvatar } from "@/components/organisms/Avatars";

export const MobileEntitySwitcherAnchor = () => {
  const { selectedEntity } = useContext(EntitySwitcherContext);

  if (!selectedEntity) {
    return null;
  }

  return selectedEntity.variant === "company" ? (
    <CompanyAvatar
      name={selectedEntity.name}
      imageURL={selectedEntity.imageURL}
    />
  ) : (
    <UserAvatar name={selectedEntity.name} imageURL={selectedEntity.imageURL} />
  );
};
