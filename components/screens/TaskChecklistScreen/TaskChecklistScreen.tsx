import React from "react";
import { Screen } from "@/components";
import {
  UpdateProjectTaskChecklistForm,
  UpdateProjectTaskChecklistFormProvider,
} from "@/components/organisms/Forms/UpdateProjectTaskChecklistForm";
import { TaskChecklistScreenProps } from "./types";

export const TaskChecklistScreen = ({
  projectId,
  taskId,
}: TaskChecklistScreenProps) => {
  return (
    <UpdateProjectTaskChecklistFormProvider projectId={projectId} taskId={taskId}>
      <Screen>
        <UpdateProjectTaskChecklistForm projectId={projectId} taskId={taskId} />
      </Screen>
    </UpdateProjectTaskChecklistFormProvider>
  );
};
