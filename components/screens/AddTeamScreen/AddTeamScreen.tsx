import React from "react";
import {
  AddTeamForm,
  AddTeamProvider,
  AddTeamSubmissionButton,
  Drawer,
} from "@/components";
import { AddTeamScreenProps } from "./types";

export const AddTeamScreen = ({ onClose }: AddTeamScreenProps) => {
  return (
    <AddTeamProvider>
      <Drawer
        title="Add team"
        actions={[<AddTeamSubmissionButton key="submit" onSuccess={onClose} />]}
        isVisible={true}
        onClose={onClose}
      >
        <AddTeamForm />
      </Drawer>
    </AddTeamProvider>
  );
};
