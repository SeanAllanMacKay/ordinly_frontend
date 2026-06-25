import React from "react";
import { useTranslation } from "react-i18next";
import {
  AddWorkerForm,
  AddWorkerProvider,
  AddWorkerSubmissionButton,
  Drawer,
} from "@/components";
import { AddWorkerScreenProps } from "./types";

export const AddWorkerScreen = ({ onClose }: AddWorkerScreenProps) => {
  const { t } = useTranslation("companies");

  return (
    <AddWorkerProvider>
      <Drawer
        title={t("addWorker.title")}
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
