import React from "react";
import { useTranslation } from "react-i18next";
import {
  AddClientForm,
  AddClientProvider,
  AddClientSubmissionButton,
  Drawer,
} from "@/components";
import { AddClientScreenProps } from "./types";

export const AddClientScreen = ({ onClose }: AddClientScreenProps) => {
  const { t } = useTranslation("clients");

  return (
    <AddClientProvider>
      <Drawer
        title={t("addClient.title")}
        actions={[
          <AddClientSubmissionButton key="submit" onSuccess={onClose} />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddClientForm />
      </Drawer>
    </AddClientProvider>
  );
};
