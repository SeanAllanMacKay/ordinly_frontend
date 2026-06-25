import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompaniesEmptyState = () => {
  const { t } = useTranslation("companies");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="companies"
      title={t("companies.emptyTitle")}
      subtitle={t("companies.emptySubtitle")}
      actions={[
        <Button
          key="add-company"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("companies.addCompany")}
          onPress={() => open("add-company")}
        />,
      ]}
    />
  );
};
