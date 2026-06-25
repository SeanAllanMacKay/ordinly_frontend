import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ClientsEmptyState = () => {
  const { t } = useTranslation("clients");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="blueprint"
      title={t("clientsEmpty.title")}
      subtitle={t("clientsEmpty.subtitle")}
      actions={[
        <Button
          key="add-client"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("addClient.submit")}
          onPress={() => open("add-client")}
        />,
      ]}
    />
  );
};
