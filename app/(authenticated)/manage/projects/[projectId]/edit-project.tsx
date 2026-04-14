import { Drawer } from "@/components";
import {
  EditProjectForm,
  EditProjectProvider,
  EditProjectSubmissionButton,
} from "@/components/organisms/Forms/EditProjectForm";
import { routes } from "@/constants/routes";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React from "react";

export default function EditProject() {
  const router = useRouter();
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.projects.projectDetails(projectId));
    }
  };

  return (
    <EditProjectProvider projectId={projectId}>
      <Drawer
        title="Edit project"
        actions={[
          <EditProjectSubmissionButton
            projectId={projectId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <EditProjectForm />
      </Drawer>
    </EditProjectProvider>
  );
}
