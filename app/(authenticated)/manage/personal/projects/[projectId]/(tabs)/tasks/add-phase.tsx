import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { AddPhaseScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const AddProjectPhase = () => {
  const router = useRouter();
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.personal.projects.tasks.root(projectId));
    }
  };

  return <AddPhaseScreen projectId={projectId} onClose={onClose} />;
};

export default AddProjectPhase;
