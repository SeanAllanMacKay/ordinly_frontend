import React, { useMemo } from "react";
import {
  Modal,
  AddProjectTaskSubmissionButton,
  AddProjectTaskDetailsInputs,
  AddProjectTaskProvider,
  Tabs,
  AddProjectTaskChecklistInputs,
} from "@/components";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { routes } from "@/constants/routes";
import { useFormContext } from "react-hook-form";

const detailsTabFields = [
  "name",
  "description",
  "status",
  "priority",
  "startDate",
  "dueDate",
];

const checklistTabFields = ["checklist"];

const AddProjectTaskContent = () => {
  const router = useRouter();
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const { formState } = useFormContext();

  const detailsErrors = useMemo(() => {
    return Object.keys(formState.errors).filter((key) =>
      detailsTabFields.includes(key),
    ).length;
  }, [formState.errors]);

  const checklistErrors = useMemo(() => {
    return !!Object.keys(formState.errors).filter((key) =>
      checklistTabFields.includes(key),
    ).length;
  }, [formState.errors]);

  console.log(formState.errors);

  return (
    <Modal
      title="Add task"
      actions={[
        <AddProjectTaskSubmissionButton
          projectId={projectId}
          onSuccess={() => {
            router.replace(routes.manage.projects.tasks.root(projectId));
          }}
        />,
      ]}
      isVisible={true}
    >
      <Tabs>
        <Tabs.Scene tabKey="details" label="Details" badge={detailsErrors}>
          <AddProjectTaskDetailsInputs />
        </Tabs.Scene>

        <Tabs.Scene
          tabKey="checklist"
          label="Checklist"
          badge={checklistErrors}
        >
          <AddProjectTaskChecklistInputs />
        </Tabs.Scene>
      </Tabs>
    </Modal>
  );
};

export default function AddProjectTask() {
  return (
    <AddProjectTaskProvider>
      <AddProjectTaskContent />
    </AddProjectTaskProvider>
  );
}
