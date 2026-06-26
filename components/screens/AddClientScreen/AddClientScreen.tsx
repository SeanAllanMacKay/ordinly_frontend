import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AddClientAssigneesInputs,
  AddClientForm,
  AddClientProvider,
  AddClientSubmissionButton,
  Drawer,
} from "@/components";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";
import { AddClientScreenProps } from "./types";

export const AddClientScreen = ({ onClose }: AddClientScreenProps) => {
  const { t } = useTranslation("clients");
  const { isPersonal } = useCurrentCompany();

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

        {!isPersonal && (
          <Accordion>
            <Accordion.Item id="assignees" label={t("accordion.assignees")}>
              <AddClientAssigneesInputs />
            </Accordion.Item>
          </Accordion>
        )}
      </Drawer>
    </AddClientProvider>
  );
};
