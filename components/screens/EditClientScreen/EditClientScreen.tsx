import React from "react";
import { useTranslation } from "react-i18next";
import { AddClientForm, Drawer } from "@/components";
import {
  EditClientProvider,
  EditClientSubmissionButton,
} from "@/components/organisms/Forms/EditClientForm";
import { EditClientScreenProps } from "./types";

export const EditClientScreen = ({
  clientId,
  onClose,
}: EditClientScreenProps) => {
  const { t } = useTranslation("clients");

  return (
    <EditClientProvider clientId={clientId}>
      <Drawer
        title={t("editClient.title")}
        actions={[
          <EditClientSubmissionButton
            key="submit"
            clientId={clientId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddClientForm />
      </Drawer>
    </EditClientProvider>
  );
};
