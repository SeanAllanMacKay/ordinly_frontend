import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyTeamsListEmptyState = () => {
  const { t } = useTranslation("companies");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="crew"
      title={t("teams.emptyTitle")}
      subtitle={t("teams.emptySubtitle")}
      actions={[
        <Button
          key="add-team"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("teams.addTeam")}
          onPress={() => open("add-team")}
        />,
      ]}
    />
  );
};
