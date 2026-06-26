import React from "react";
import { useTranslation } from "react-i18next";
import { AddContactForm, Button, Drawer } from "@/components";
import {
  EditContactProvider,
  EditContactSubmissionButton,
} from "@/components/organisms/Forms/EditContactForm";
import { useModals } from "@/util/navigation/useModals";
import { EditContactScreenProps } from "./types";

export const EditContactScreen = ({
  clientId,
  contactId,
  onClose,
}: EditContactScreenProps) => {
  const { t } = useTranslation("clients");
  const { open: openModal } = useModals();

  return (
    <EditContactProvider clientId={clientId} contactId={contactId}>
      <Drawer
        title={t("editContact.title")}
        actions={[
          <Button
            key="delete"
            variant="danger"
            mode="outlined"
            icon="remove"
            permission="all_clients:delete"
            label={t("deleteContact.trigger")}
            onPress={() => openModal("confirm-delete-contact")}
          />,
          <EditContactSubmissionButton
            key="submit"
            clientId={clientId}
            contactId={contactId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddContactForm />
      </Drawer>
    </EditContactProvider>
  );
};
