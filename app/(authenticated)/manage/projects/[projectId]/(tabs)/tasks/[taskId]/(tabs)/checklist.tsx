import React from "react";
import { Screen } from "@/components";
import { useGlobalSearchParams } from "expo-router";
import {
  UpdateProjectTaskChecklistForm,
  UpdateProjectTaskChecklistFormProvider,
} from "@/components/organisms/Forms/UpdateProjectTaskChecklistForm";

export default function ProjectTaskChecklist() {
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  return (
    <UpdateProjectTaskChecklistFormProvider
      projectId={projectId}
      taskId={taskId}
    >
      <Screen>
        <UpdateProjectTaskChecklistForm projectId={projectId} taskId={taskId} />
      </Screen>
    </UpdateProjectTaskChecklistFormProvider>
  );
}
