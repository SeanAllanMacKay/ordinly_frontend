import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Drawer } from "@/components";
import {
  EditWorkerForm,
  EditWorkerProvider,
  EditWorkerSubmissionButton,
} from "@/components/organisms/Forms/EditWorkerForm";
import { useModals } from "@/util/navigation/useModals";
import { EditWorkerScreenProps } from "./types";

export const EditWorkerScreen = ({
  workerId,
  onClose,
}: EditWorkerScreenProps) => {
  const { t } = useTranslation("companies");
  const { open: openModal } = useModals();

  return (
    <EditWorkerProvider workerId={workerId}>
      <Drawer
        title={t("editWorker.title")}
        actions={[
          <Button
            key="delete"
            variant="danger"
            mode="outlined"
            icon="remove"
            permission="workers:delete"
            label={t("deleteWorker.trigger")}
            onPress={() => openModal("confirm-delete-worker", { workerId })}
          />,
          <EditWorkerSubmissionButton
            key="submit"
            workerId={workerId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <EditWorkerForm />
      </Drawer>
    </EditWorkerProvider>
  );
};
