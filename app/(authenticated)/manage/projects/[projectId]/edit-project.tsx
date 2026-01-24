import React from "react";
import {
  Form,
  FormField,
  Modal,
  TextInput,
  Select,
  DateInput,
  Button,
} from "@/components";
import { useForm } from "react-hook-form";
import { requiredValidator } from "@/util/validation";
import { useEditProjectMutation } from "@/api-abstraction/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { projectQueryKeys } from "@/api-abstraction/queries/queryKeys";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PROJECT_STATUSES } from "@/constants/PROJECT_STATUSES";
import { PROJECT_PRIORITIES } from "@/constants/PROJECT_PRIORITIES";
import { useGetPersonalProjectQuery } from "@/api-abstraction/queries";

export default function EditProject() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useLocalSearchParams<{ projectId: string }>();

  const { data: { project } = {} } = useGetPersonalProjectQuery({
    projectId: params?.projectId,
  });

  const editProjectForm = useForm<{
    name: string;
    description: string;
    status: "notStarted" | "blocked" | "inProgress" | "complete";
    priority: "critical" | "high" | "medium" | "low";
    startDate: Date;
    dueDate: Date;
  }>({
    mode: "all",
    defaultValues: project,
  });

  const editProjectMutation = useEditProjectMutation({
    projectId: params?.projectId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.personalProjects(),
      });

      router.back();
    },
  });

  const onSubmit = editProjectForm.handleSubmit((formValues) => {
    editProjectMutation.mutate(formValues);
  });

  return (
    <Modal
      title="Edit project"
      actions={[
        <Button icon="pencil-outline" onPress={onSubmit} mode="contained">
          Save
        </Button>,
      ]}
    >
      <Form form={editProjectForm}>
        <FormField
          name="name"
          label="Name"
          component={TextInput}
          validation={{ requiredValidator }}
        />

        <FormField
          name="description"
          label="Description"
          component={(fieldProps) => (
            <TextInput {...fieldProps} type="multiline" />
          )}
        />

        <FormField
          name="status"
          label="Status"
          component={(fieldProps) => (
            <Select {...fieldProps} options={PROJECT_STATUSES} />
          )}
        />

        <FormField
          name="priority"
          label="Priority"
          component={(fieldProps) => (
            <Select {...fieldProps} options={PROJECT_PRIORITIES} />
          )}
        />

        <FormField name="startDate" label="Start date" component={DateInput} />

        <FormField name="dueDate" label="Due date" component={DateInput} />
      </Form>
    </Modal>
  );
}
