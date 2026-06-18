import React from "react";
import {
  AddProjectForm,
  AddProjectProvider,
  AddProjectSubmissionButton,
  Drawer,
} from "@/components";
import { AddProjectScreenProps } from "./types";

export const AddProjectScreen = ({ onClose }: AddProjectScreenProps) => {
  return (
    <AddProjectProvider>
      <Drawer
        title="Add project"
        actions={[
          <AddProjectSubmissionButton key="submit" onSuccess={onClose} />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddProjectForm />
      </Drawer>
    </AddProjectProvider>
  );
};
