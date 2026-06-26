import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { useModals } from "@/util/navigation/useModals";
import { DeleteAccountScreen } from "../DeleteAccountScreen";
import { DeleteCompanyScreen } from "../DeleteCompanyScreen";
import { DeleteProjectScreen } from "../DeleteProjectScreen";
import { DeleteTaskScreen } from "../DeleteTaskScreen";
import { DeleteClientScreen } from "../DeleteClientScreen";
import { DeleteContactScreen } from "../DeleteContactScreen";
import { DeleteTeamScreen } from "../DeleteTeamScreen";
import { DeleteWorkerScreen } from "../DeleteWorkerScreen";
import { DeleteRoleScreen } from "../DeleteRoleScreen";
import { PermissionDeniedScreen } from "../PermissionDeniedScreen";

// Single global host for confirmation modals. Mounted once in the authenticated
// layout, it watches the `modal` query param and renders the matching screen in
// place over whatever screen the user is currently on. Entity ids are read from
// the active route params (exactly like DrawerHost reads `projectId`). Add a
// `case` per modal here.
export const ModalHost = () => {
  const {
    modal,
    projectId,
    companyId,
    taskId,
    clientId,
    contactId,
    teamId,
    workerId,
    roleId,
    deniedMessage,
  } = useGlobalSearchParams<{
    modal?: string;
    projectId?: string;
    companyId?: string;
    taskId?: string;
    clientId?: string;
    contactId?: string;
    teamId?: string;
    workerId?: string;
    roleId?: string;
    deniedMessage?: string;
  }>();
  const { close } = useModals();

  switch (modal) {
    case "confirm-delete-project":
      return <DeleteProjectScreen projectId={projectId!} onClose={close} />;
    case "confirm-delete-company":
      return <DeleteCompanyScreen companyId={companyId!} onClose={close} />;
    case "confirm-delete-account":
      return <DeleteAccountScreen onClose={close} />;
    case "permission-denied":
      return (
        <PermissionDeniedScreen message={deniedMessage} onClose={close} />
      );
    case "confirm-delete-task":
      return (
        <DeleteTaskScreen
          projectId={projectId!}
          taskId={taskId!}
          onClose={close}
        />
      );
    case "confirm-delete-client":
      return <DeleteClientScreen clientId={clientId!} onClose={close} />;
    case "confirm-delete-contact":
      return (
        <DeleteContactScreen
          clientId={clientId!}
          contactId={contactId!}
          onClose={close}
        />
      );
    case "confirm-delete-team":
      return <DeleteTeamScreen teamId={teamId!} onClose={close} />;
    case "confirm-delete-worker":
      return <DeleteWorkerScreen workerId={workerId!} onClose={close} />;
    case "confirm-delete-role":
      return <DeleteRoleScreen roleId={roleId!} onClose={close} />;
    default:
      return null;
  }
};
