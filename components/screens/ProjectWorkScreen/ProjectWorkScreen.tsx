import React from "react";
import {
  FloatingActionButton,
  ProjectTasksDataList,
  Screen,
} from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";
import { ProjectWorkScreenProps } from "./types";

export const ProjectWorkScreen = (_props: ProjectWorkScreenProps) => {
  const { open } = useDrawers();

  return (
    <Screen>
      <ProjectTasksDataList />

      <FloatingActionButton
        icon="plus"
        items={[
          {
            label: "Add phase",
            icon: "phases",
            onPress: () => open("add-phase"),
          },
          {
            label: "Add milestone",
            icon: "milestones",
            onPress: () => open("add-milestone"),
          },
          {
            label: "Add task",
            icon: "tasks",
            onPress: () => open("add-task"),
          },
        ]}
      />
    </Screen>
  );
};
