import React from "react";
import { useTranslation } from "react-i18next";
import {
  AddContactForm,
  AddContactProvider,
  AddContactSubmissionButton,
  Drawer,
} from "@/components";
import { AddContactScreenProps } from "./types";

export const AddContactScreen = ({
  clientId,
  onClose,
}: AddContactScreenProps) => {
  const { t } = useTranslation("clients");

  return (
    <AddContactProvider>
      <Drawer
        title={t("addContact.title")}
        actions={[
          <AddContactSubmissionButton
            key="submit"
            clientId={clientId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddContactForm />
      </Drawer>
    </AddContactProvider>
  );
};
