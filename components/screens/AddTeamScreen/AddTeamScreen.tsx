import React from "react";
import { useTranslation } from "react-i18next";
import {
  AddTeamForm,
  AddTeamProvider,
  AddTeamSubmissionButton,
  Drawer,
} from "@/components";
import { AddTeamScreenProps } from "./types";

export const AddTeamScreen = ({ onClose }: AddTeamScreenProps) => {
  const { t } = useTranslation("companies");

  return (
    <AddTeamProvider>
      <Drawer
        title={t("addTeam.title")}
        actions={[<AddTeamSubmissionButton key="submit" onSuccess={onClose} />]}
        isVisible={true}
        onClose={onClose}
      >
        <AddTeamForm />
      </Drawer>
    </AddTeamProvider>
  );
};
