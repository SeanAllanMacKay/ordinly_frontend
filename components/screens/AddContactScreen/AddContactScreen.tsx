import React from "react";
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
  return (
    <AddContactProvider>
      <Drawer
        title="Add contact"
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
