import React, { useContext } from "react";
import { EntitySwitcherContext } from "./EntitySwitcherContext";
import { CompanyAvatar } from "@/components/organisms/CompanyAvatar";
import { UserAvatar } from "@/components/organisms/UserAvatar";

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
