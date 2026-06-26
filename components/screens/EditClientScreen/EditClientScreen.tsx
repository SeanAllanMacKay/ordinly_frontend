import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AddClientAssigneesInputs,
  AddClientForm,
  Drawer,
} from "@/components";
import {
  EditClientProvider,
  EditClientSubmissionButton,
} from "@/components/organisms/Forms/EditClientForm";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";
import { EditClientScreenProps } from "./types";

export const EditClientScreen = ({
  clientId,
  onClose,
}: EditClientScreenProps) => {
  const { t } = useTranslation("clients");
  const { isPersonal } = useCurrentCompany();

  return (
    <EditClientProvider clientId={clientId}>
      <Drawer
        title={t("editClient.title")}
        actions={[
          <EditClientSubmissionButton
            key="submit"
            clientId={clientId}
            onSuccess={onClose}
          />,
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
    </EditClientProvider>
  );
};
