import React from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "@/components";
import { EditAccountDetailsProvider } from "./EditAccountDetailsProvider";
import { EditAccountDetailsForm } from "./EditAccountDetailsForm";
import { EditAccountDetailsSubmissionButton } from "./EditAccountDetailsSubmissionButton";
import { EditAccountDetailsScreenProps } from "./types";

export const EditAccountDetailsScreen = ({
  onClose,
}: EditAccountDetailsScreenProps) => {
  const { t } = useTranslation("common");

  return (
    <EditAccountDetailsProvider>
      <Drawer
        title={t("editAccountDetails.title")}
        isVisible
        onClose={onClose}
        actions={[
          <EditAccountDetailsSubmissionButton
            key="submit"
            onSuccess={onClose}
          />,
        ]}
      >
        <EditAccountDetailsForm />
      </Drawer>
    </EditAccountDetailsProvider>
  );
};
