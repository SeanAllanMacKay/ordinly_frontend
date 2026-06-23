import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { EditProjectScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const EditProject = () => {
  const router = useRouter();
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.personal.projects.projectDetails(projectId));
    }
  };

  return <EditProjectScreen projectId={projectId} onClose={onClose} />;
};

export default EditProject;
