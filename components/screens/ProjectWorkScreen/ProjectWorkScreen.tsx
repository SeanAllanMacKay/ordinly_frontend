import React from "react";
import { useTranslation } from "react-i18next";
import {
  FloatingActionButton,
  ProjectTasksDataList,
  Screen,
} from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";
import { ProjectWorkScreenProps } from "./types";

export const ProjectWorkScreen = (_props: ProjectWorkScreenProps) => {
  const { t } = useTranslation("tasks");
  const { open } = useDrawers();

  return (
    <Screen>
      <ProjectTasksDataList />

      <FloatingActionButton
        icon="plus"
        items={[
          {
            label: t("phase.submit"),
            icon: "phases",
            onPress: () => open("add-phase"),
          },
          {
            label: t("milestone.submit"),
            icon: "milestones",
            onPress: () => open("add-milestone"),
          },
          {
            label: t("addTask.submit"),
            icon: "tasks",
            onPress: () => open("add-task"),
          },
        ]}
      />
    </Screen>
  );
};
