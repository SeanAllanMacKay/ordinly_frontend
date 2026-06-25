import React from "react";
import { useTranslation } from "react-i18next";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ProjectsEmptyState = () => {
  const { t } = useTranslation("projects");
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="projects"
      title={t("emptyState.title")}
      subtitle={t("emptyState.subtitle")}
      actions={[
        <Button
          key="add-project"
          variant="primary"
          mode="contained"
          icon="plus"
          label={t("addProject.submit")}
          onPress={() => open("add-project")}
        />,
      ]}
    />
  );
};
