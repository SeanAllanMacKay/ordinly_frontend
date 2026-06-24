import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { useDrawers } from "@/util/navigation/useDrawers";
import { AddClientScreen } from "../AddClientScreen";
import { AddCompanyScreen } from "../AddCompanyScreen";
import { AddContactScreen } from "../AddContactScreen";
import { AddMilestoneScreen } from "../AddMilestoneScreen";
import { AddPhaseScreen } from "../AddPhaseScreen";
import { AddProjectScreen } from "../AddProjectScreen";
import { AddRoleScreen } from "../AddRoleScreen";
import { AddTaskScreen } from "../AddTaskScreen";
import { AddTeamScreen } from "../AddTeamScreen";
import { AddWorkerScreen } from "../AddWorkerScreen";

// Single global host for drawer modals. Mounted once in the authenticated
// layout, it watches the `drawer` query param and renders the matching screen
// in place over whatever screen the user is currently on. The float-over-
// everything overlay comes from the Drawer atom's own RN <Modal>, so no route
// or presentation config is involved. Add a `case` per modal here.
export const DrawerHost = () => {
  const { drawer, projectId, clientId } = useGlobalSearchParams<{
    drawer?: string;
    projectId?: string;
    clientId?: string;
  }>();
  const { close } = useDrawers();

  switch (drawer) {
    case "add-company":
      return <AddCompanyScreen onClose={close} />;
    case "add-client":
      return <AddClientScreen onClose={close} />;
    case "add-contact":
      return <AddContactScreen clientId={clientId!} onClose={close} />;
    case "add-project":
      return <AddProjectScreen onClose={close} />;
    case "add-role":
      return <AddRoleScreen onClose={close} />;
    case "add-team":
      return <AddTeamScreen onClose={close} />;
    case "add-worker":
      return <AddWorkerScreen onClose={close} />;
    case "add-task":
      return <AddTaskScreen projectId={projectId!} onClose={close} />;
    case "add-milestone":
      return <AddMilestoneScreen projectId={projectId!} onClose={close} />;
    case "add-phase":
      return <AddPhaseScreen projectId={projectId!} onClose={close} />;
    default:
      return null;
  }
};
