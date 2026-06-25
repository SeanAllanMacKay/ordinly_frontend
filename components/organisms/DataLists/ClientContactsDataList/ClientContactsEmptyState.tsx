import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ClientContactsEmptyState = () => {
  const { t } = useTranslation("clients");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="identification-card"
      title={t("contactsEmpty.title")}
      subtitle={t("contactsEmpty.subtitle")}
      actions={[
        <Button
          key="add-contact"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("addContact.submit")}
          onPress={() => open("add-contact")}
        />,
      ]}
    />
  );
};
