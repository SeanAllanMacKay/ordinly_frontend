import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyWorkersListEmptyState = () => {
  const { t } = useTranslation("companies");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="account"
      title={t("workers.emptyTitle")}
      subtitle={t("workers.emptySubtitle")}
      actions={[
        <Button
          key="add-worker"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("workers.addWorker")}
          onPress={() => open("add-worker")}
        />,
      ]}
    />
  );
};
