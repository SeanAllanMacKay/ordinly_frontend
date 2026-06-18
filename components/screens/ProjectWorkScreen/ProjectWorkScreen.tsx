import React from "react";
import {
  FloatingActionButton,
  ProjectTasksDataList,
  Screen,
} from "@/components";
import { routes } from "@/constants/routes";
import { ProjectWorkScreenProps } from "./types";

export const ProjectWorkScreen = ({ projectId }: ProjectWorkScreenProps) => {
  return (
    <Screen>
      <ProjectTasksDataList />

      <FloatingActionButton
        icon="plus"
        items={[
          {
            label: "Add phase",
            icon: "phases",
            href: routes.manage.projects.tasks.addPhase(projectId),
          },
          {
            label: "Add milestone",
            icon: "milestones",
            href: routes.manage.projects.tasks.addMilestone(projectId),
          },
          {
            label: "Add task",
            icon: "tasks",
            href: routes.manage.projects.tasks.addTask(projectId),
          },
        ]}
      />
    </Screen>
  );
};
