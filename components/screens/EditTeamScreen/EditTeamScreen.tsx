import React from "react";
import { useTranslation } from "react-i18next";
import { AddTeamForm, Button, Drawer } from "@/components";
import {
  EditTeamProvider,
  EditTeamSubmissionButton,
} from "@/components/organisms/Forms/EditTeamForm";
import { useModals } from "@/util/navigation/useModals";
import { EditTeamScreenProps } from "./types";

export const EditTeamScreen = ({ teamId, onClose }: EditTeamScreenProps) => {
  const { t } = useTranslation("companies");
  const { open: openModal } = useModals();

  return (
    <EditTeamProvider teamId={teamId}>
      <Drawer
        title={t("editTeam.title")}
        actions={[
          <Button
            key="delete"
            variant="danger"
            mode="outlined"
            icon="remove"
            permission="teams:delete"
            label={t("deleteTeam.trigger")}
            onPress={() => openModal("confirm-delete-team", { teamId })}
          />,
          <EditTeamSubmissionButton
            key="submit"
            teamId={teamId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddTeamForm />
      </Drawer>
    </EditTeamProvider>
  );
};
