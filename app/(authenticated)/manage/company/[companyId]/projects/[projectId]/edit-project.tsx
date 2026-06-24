import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { EditProjectScreen } from "@/components/screens";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";

const EditProject = () => {
  const router = useRouter();
  const projectRoutes = useProjectRoutes();
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(projectRoutes.projectDetails(projectId));
    }
  };

  return <EditProjectScreen projectId={projectId} onClose={onClose} />;
};

export default EditProject;
