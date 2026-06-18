import React from "react";
import { Drawer } from "@/components";
import {
  EditProjectForm,
  EditProjectProvider,
  EditProjectSubmissionButton,
} from "@/components/organisms/Forms/EditProjectForm";
import { EditProjectScreenProps } from "./types";

export const EditProjectScreen = ({
  projectId,
  onClose,
}: EditProjectScreenProps) => {
  return (
    <EditProjectProvider projectId={projectId}>
      <Drawer
        title="Edit project"
        actions={[
          <EditProjectSubmissionButton
            key="submit"
            projectId={projectId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <EditProjectForm projectId={projectId} />
      </Drawer>
    </EditProjectProvider>
  );
};
