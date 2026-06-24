import React from "react";
import {
  AddRoleForm,
  AddRoleProvider,
  AddRoleSubmissionButton,
  Drawer,
} from "@/components";
import { AddRoleScreenProps } from "./types";

export const AddRoleScreen = ({ onClose }: AddRoleScreenProps) => {
  return (
    <AddRoleProvider>
      <Drawer
        title="Add role"
        actions={[<AddRoleSubmissionButton key="submit" onSuccess={onClose} />]}
        isVisible={true}
        onClose={onClose}
      >
        <AddRoleForm />
      </Drawer>
    </AddRoleProvider>
  );
};
