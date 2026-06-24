import React from "react";
import {
  AddWorkerForm,
  AddWorkerProvider,
  AddWorkerSubmissionButton,
  Drawer,
} from "@/components";
import { AddWorkerScreenProps } from "./types";

export const AddWorkerScreen = ({ onClose }: AddWorkerScreenProps) => {
  return (
    <AddWorkerProvider>
      <Drawer
        title="Add worker"
        actions={[
          <AddWorkerSubmissionButton key="submit" onSuccess={onClose} />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddWorkerForm />
      </Drawer>
    </AddWorkerProvider>
  );
};
