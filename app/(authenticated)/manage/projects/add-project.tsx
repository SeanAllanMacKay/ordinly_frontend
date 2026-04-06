import React from "react";
import {
  Modal,
  AddProjectSubmissionButton,
  AddProjectForm,
  AddProjectProvider,
} from "@/components";
import { useRouter } from "expo-router";
import { routes } from "@/constants/routes";

export default function AddProject() {
  const router = useRouter();

  return (
    <AddProjectProvider>
      <Modal
        title="Add project"
        actions={[
          <AddProjectSubmissionButton
            onSuccess={() => {
              router.replace(routes.manage.projects.root());
            }}
          />,
        ]}
        isVisible={true}
      >
        <AddProjectForm />
      </Modal>
    </AddProjectProvider>
  );
}
