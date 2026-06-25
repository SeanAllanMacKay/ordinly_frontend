import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyRolesListEmptyState = () => {
  const { t } = useTranslation("companies");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="identification-card"
      title={t("roles.emptyTitle")}
      subtitle={t("roles.emptySubtitle")}
      actions={[
        <Button
          key="add-role"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("roles.addRole")}
          onPress={() => open("add-role")}
        />,
      ]}
    />
  );
};
