import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { useDrawers } from "@/util/navigation/useDrawers";
import { AddCompanyScreen } from "../AddCompanyScreen";
import { AddProjectScreen } from "../AddProjectScreen";

// Single global host for drawer modals. Mounted once in the authenticated
// layout, it watches the `drawer` query param and renders the matching screen
// in place over whatever screen the user is currently on. The float-over-
// everything overlay comes from the Drawer atom's own RN <Modal>, so no route
// or presentation config is involved. Add a `case` per modal here.
export const DrawerHost = () => {
  const { drawer } = useGlobalSearchParams<{ drawer?: string }>();
  const { close } = useDrawers();

  switch (drawer) {
    case "add-company":
      return <AddCompanyScreen onClose={close} />;
    case "add-project":
      return <AddProjectScreen onClose={close} />;
    default:
      return null;
  }
};
