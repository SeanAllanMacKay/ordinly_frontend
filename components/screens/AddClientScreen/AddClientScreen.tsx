import React from "react";
import {
  AddClientForm,
  AddClientProvider,
  AddClientSubmissionButton,
  Drawer,
} from "@/components";
import { AddClientScreenProps } from "./types";

export const AddClientScreen = ({ onClose }: AddClientScreenProps) => {
  return (
    <AddClientProvider>
      <Drawer
        title="Add client"
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
