import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { useModals } from "@/util/navigation/useModals";
import { DeleteAccountScreen } from "../DeleteAccountScreen";
import { DeleteCompanyScreen } from "../DeleteCompanyScreen";
import { DeleteProjectScreen } from "../DeleteProjectScreen";
import { DeleteTaskScreen } from "../DeleteTaskScreen";

// Single global host for confirmation modals. Mounted once in the authenticated
// layout, it watches the `modal` query param and renders the matching screen in
// place over whatever screen the user is currently on. Entity ids are read from
// the active route params (exactly like DrawerHost reads `projectId`). Add a
// `case` per modal here.
export const ModalHost = () => {
  const { modal, projectId, companyId, taskId } = useGlobalSearchParams<{
    modal?: string;
    projectId?: string;
    companyId?: string;
    taskId?: string;
  }>();
  const { close } = useModals();

  switch (modal) {
    case "confirm-delete-project":
      return <DeleteProjectScreen projectId={projectId!} onClose={close} />;
    case "confirm-delete-company":
      return <DeleteCompanyScreen companyId={companyId!} onClose={close} />;
    case "confirm-delete-account":
      return <DeleteAccountScreen onClose={close} />;
    case "confirm-delete-task":
      return (
        <DeleteTaskScreen
          projectId={projectId!}
          taskId={taskId!}
          onClose={close}
        />
      );
    default:
      return null;
  }
};
